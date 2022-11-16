import 'package:area/src/mixins/user_class.dart';
import 'package:flutter/material.dart';
import 'package:area/src/mixins/validation_mixin.dart';
import '../mixins/send_json.dart';
import 'reaction_screen.dart';

List<String> items = [];
String dropdownvalue = items.first;

class DynamicFormScreen extends StatefulWidget {
  var action;
  var context;
  DynamicFormScreen({required this.action, required this.context});
  @override
  _DynamicFormScreenState createState() =>
      _DynamicFormScreenState(action: action, context: context);
}

class _DynamicFormScreenState extends State<DynamicFormScreen>
    with ValidationMixin, NetworkingHelper {
int tick = 0;
  var res;
  var action;
  var context;

  _DynamicFormScreenState({required this.action, required this.context});

  String result = '';
  List<Map<String, dynamic>> list = [];
  final List<GlobalKey<FormState>> _formKeys = [];
  final formkey = GlobalKey<FormState>();
  Widget build(context) {
    NetworkingHelper.user.actionData = action;
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            tick = 0;
            Navigator.pop(context);
          },
        ),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: const IconThemeData(color: Colors.black),
        title: Text('${action['page_label']} Configuration',
            style: TextStyle(color: Colors.black)),
      ),
      body: Form(
        key: formkey,
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              ListView.builder(
                shrinkWrap: true,
                itemCount: action['fields'].length,
                itemBuilder: (BuildContext context, int index) {
                  if (action['fields'][index]['field_type'] == 'select' &&
                      tick == 0) {
                    dropdownvalue = action['fields'][index]['field_options'][0]
                        ['option_label'];
                    tick = 1;
                  }
                  return _row(
                      action['fields'][index]['field_inputNum'],
                      action['fields'][index]['field_label'],
                      action['fields'][index]['field_placeholder'],
                      action['fields'][index]['field_type'],
                      action['fields'][index]['field_error'],
                      index);
                },
              ),
              const SizedBox(
                height: 15.0,
              ),
              continueButt(),
            ],
          ),
        ),
      ),
    );
  }

  _row(key, index, hint, type, error, field_inputNum) {
    if (type == 'select') {
      items = initItems(action['fields'][field_inputNum]['field_options']);
      return DropdownButton<String>(
          value: dropdownvalue,
          icon: const Icon(Icons.keyboard_arrow_down),
          items: items.map((String items) {
            return DropdownMenuItem(
              value: items,
              child: Text(items),
            );
          }).toList(),
          onChanged: (String? value) {
            setState(() {
              dropdownvalue = value!;
              int foundkey = -1;
              for (var map in list) {
                if (map.containsKey('id')) {
                  if (map['id'] == key) {
                    foundkey = key;
                    break;
                  }
                }
              }
              if (foundkey != -1) {
                list.removeWhere((map) {
                  return map['id'] == foundkey;
                });
              } else {
                list.add({
                  'id': key,
                  'value': getId_value(
                      value, action['fields'][field_inputNum]['field_options'])
                });
              }
              Map<String, dynamic> json = {
                'id': key,
                'value': getId_value(
                    value, action['fields'][field_inputNum]['field_options'])
              };
              list.add(json);
            });
          });
    } else {
      return Row(
        children: [
          Text('$index'),
          const SizedBox(width: 30.0),
          Expanded(
              child: TextFormField(
            decoration: InputDecoration(
              hintText: hint,
            ),
            validator: (value) {
              if (!value!.isEmpty && checkArg(type, value)) {
                return null;
              }
              return error;
            },
            onChanged: (value) {
              int foundkey = -1;
              for (var map in list) {
                if (map.containsKey('id')) {
                  if (map['id'] == key) {
                    foundkey = key;
                    break;
                  }
                }
              }
              if (foundkey != -1) {
                list.removeWhere((map) {
                  return map['id'] == foundkey;
                });
              } else {
                list.add({'id': key, 'value': value});
              }
              Map<String, dynamic> json = {'id': key, 'value': value};
              list.add(json);
            },
          )),
        ],
      );
    }
  }

  Widget continueButt() {
    return FloatingActionButton.extended(
        backgroundColor: Colors.black,
        label: Text('Continuer'),
        heroTag: 'continue',
        onPressed: () {
          print(list);
          if (formkey.currentState?.validate() == true) {
            res = convert_to_action(list, action);
            getReactions().then((value) {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          Reactionscreen(reaction_list: value, action: res)));
            });
          }
          ;
        });
  }
}
