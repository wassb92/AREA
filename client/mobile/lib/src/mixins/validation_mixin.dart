import 'dart:convert';
import 'package:area/src/mixins/send_json.dart';
import 'package:area/src/screens/action_screen.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';

import '../screens/area_screen.dart';

class ValidationMixin {
  String? checkPw(value) {
    if (value!.length < 6 || value.contains(' ')) {
      return 'mauvais mot de passe ou adresse mail';
    }
    return null;
  }

  int convert_hour_into_second(String time) {
    var hour = int.parse(time.split(':')[0]);
    var minute = int.parse(time.split(':')[1]);
    var second = int.parse(time.split(':')[2]);
    return hour * 3600 + minute * 60 + second;
  }

  String difference_between_time(String time1, String time2) {
    var hour1 = int.parse(time1.split(':')[0]);
    var minute1 = int.parse(time1.split(':')[1]);
    var hour2 = int.parse(time2.split(':')[0]);
    var minute2 = int.parse(time2.split(':')[1]);
    var hour = hour2 - hour1;
    var minute = minute2 - minute1;
    return hour.toString() + ':' + minute.toString();
  }

  String to24hours(time) {
    final hour = time.hour.toString().padLeft(2, "0");
    final min = time.minute.toString().padLeft(2, "0");
    return "$hour:$min:00";
  }

  String parseDate(String date) {
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2].split('T')[0];
    return day + '/' + month + '/' + year;
  }

  String parseHours(String date) {
    var hour = date.split('T')[1].split(':')[0];
    var minute = date.split('T')[1].split(':')[1];
    return hour + ':' + minute;
  }

  bool checkTime(time) {
    try {
      var hour = int.parse(time.split(':')[0]);
      var minute = int.parse(time.split(':')[1]);
      if (hour > 24 || minute > 59) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  bool checkArg(type, arg) {
    if (type == 'time') return checkTime(arg);
    if (type == 'email') return checkEmail(arg);
    if (type == 'text') return checkText(arg);
    if (type == 'number') return checkNumber(arg);
    if (type == 'tel') return checkTel(arg);
    return true;
  }

  bool checkEmail(email) {
    return EmailValidator.validate(email ?? "") ? true : false;
  }

  bool checkText(text) {
    return text.length > 0 ? true : false;
  }

  String convert_to_action(arg, action) {
    List<String> arguments = [];
    for (var data in arg) {
      arguments.add(
          "\"${action['fields'][data['id']]['field_id']}\" : \"${data['value']}\"");
    }
    var res =
        "{ \"name\": \"${action['action_name']}\", \"args\": {${arguments.join(', ')}}}";
    return res;
  }

  String convert_to_reaction(arg, reaction) {
    List<String> arguments = [];
    for (var data in arg) {
      arguments.add(
          "\"${reaction['fields'][data['id']]['field_id']}\": \"${data['value']}\"");
    }
    var res =
        "{ \"name\": \"${reaction['reaction_name']}\", \"args\": { ${arguments.join(', ')} }}";
    return res;
  }

  String create_area(action, reaction) {
    return " {\"action\": $action, \"reaction\": $reaction}";
  }

  List<String> initItems(options) {
    List<String> items = [];
    for (var option in options) {
      items.add(option['option_label']);
    }
    return items;
  }

  String getId_value(value, list) {
    for (var item in list) {
      if (item['option_label'] == value && item['option_value'] == null) {
        return item['option_id'];
      } else if (item['option_label'] == value &&
          item['option_value'] != null) {
        return item['option_value'];
      }
    }
    return '';
  }

  List<dynamic> parse_actions(_actions) {
    List<List<dynamic>> actions = [];
    List<String> services = [];
    for (var action in _actions) {
      if (!services.contains(action['service'])) {
        services.add(action['service']);
        actions.add([action]);
      } else {
        for (var i = 0; i < actions.length; i++) {
          if (actions[i][0]['service'] == action['service']) {
            actions[i].add(action);
          }
        }
      }
    }
    return actions;
  }

  List<dynamic> parse_reactions(_reactions) {
    List<List<dynamic>> actions = [];
    List<String> services = [];
    for (var reaction in _reactions) {
      if (!services.contains(reaction['service'])) {
        services.add(reaction['service']);
        actions.add([reaction]);
      } else {
        for (var i = 0; i < actions.length; i++) {
          if (actions[i][0]['service'] == reaction['service']) {
            actions[i].add(reaction);
          }
        }
      }
    }
    return actions;
  }

  bool checkNumber(String s) {
    if (s == null) {
      return false;
    }
    return double.tryParse(s) != null;
  }

  bool checkTel(String s) {
    if (s == null && double.tryParse(s) != null) {
      return false;
    }
    return s.length == 10;
  }

  Widget areas_list() {
    return ListView.builder(
      physics: const AlwaysScrollableScrollPhysics(),
      itemCount: NetworkingHelper.user.areas.length,
      itemBuilder: (BuildContext context, int index) {
        var infos_ = NetworkingHelper.user.areas[index];
        heroTag:
        'Area $index';
        return Align(
          alignment: Alignment.topRight,
          child: ListTile(
            title: Text(
                'Area $index\t\t crée le: ${parseDate(infos_['createdAt'])} à : ${parseHours(infos_['createdAt'])}'),
            subtitle: Text(
                'Action: ${infos_['action']}\t\tReaction: ${infos_['reaction']}',
                style: TextStyle(fontSize: 10)),
            trailing: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 166, 16, 16),
              ),
              onPressed: () {
                NetworkingHelper.deleteArea(infos_['_id']).then((value) {
                  if (value == 200) {
                    NetworkingHelper.StockUserAreas();
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                        content: Text(
                            'AREA supprimé avec succes (scroller vers le haut pour voir les changements)')));
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                        content: Text(
                            'AREA non supprimée ou déjà supprimée (scroller vers le haut pour voir les changements)')));
                  }
                });
              },
              child: const Text('Supprimer'),
            ),
          ),
        );
      },
    );
  }

  Widget proposeAreas(context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            'vous avez 0 AREA',
            style: TextStyle(fontSize: 15),
          ),
          SizedBox(
            height: 10,
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.black,
            ),
            onPressed: () {
              NetworkingHelper.getActions().then((value) {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => Actionscreen(action_list: value)),
                );
              });
            },
            child: const Text('Crée une area'),
          ),
          //refresh button
          SizedBox(
            height: 10,
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.black,
            ),
            onPressed: () {
              NetworkingHelper.StockUserAreas();
             Navigator.pushReplacement(
    context, 
    PageRouteBuilder(
        pageBuilder: (context, animation1, animation2) => areaScreen(),
        transitionDuration: Duration.zero,
        reverseTransitionDuration: Duration.zero,
    ),
);
            },
            child: const Text('Rafraichir les areas'),
          ),
        ],
      ),
    );
  }

  

  Future<dynamic> changeServIP(context) {
    var ipController = TextEditingController();
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('changer ip du serveur'),
            content: TextField(
              controller: ipController,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 
                    'IP actuel \"${NetworkingHelper.ip ?? NetworkingHelper.localhost}\"',

                hintText:
                    'IP actuel \"${NetworkingHelper.ip ?? NetworkingHelper.localhost}\"',
              ),
            ),
            actions: [
              TextButton(
                child: Text('Annuler'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              TextButton(
                child: Text('Valider'),
                onPressed: () {
                  NetworkingHelper.ip = ipController.text;
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        });
  }
}
