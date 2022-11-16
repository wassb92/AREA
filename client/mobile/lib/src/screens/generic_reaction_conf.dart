import 'package:area/src/screens/area_resume.dart';
import 'package:flutter/material.dart';
import 'package:area/src/mixins/validation_mixin.dart';

import '../mixins/send_json.dart';

// create a dynamic form screens
class DynamicFormScreen extends StatefulWidget {
  var reaction;
  var action;
  DynamicFormScreen({required this.reaction, required this.action});
  @override
  _DynamicFormScreenState createState() =>
      _DynamicFormScreenState(reaction: reaction, action: action);
}

class _DynamicFormScreenState extends State<DynamicFormScreen>
    with ValidationMixin, NetworkingHelper {
  var reaction;
  var action;
  String area = '';
  _DynamicFormScreenState({required this.reaction, required this.action});

  String result = '';
  List<Map<String, dynamic>> list = [];
  final List<GlobalKey<FormState>> _formKeys = [];
  final formkey = GlobalKey<FormState>();
  Widget build(BuildContext context) {
    NetworkingHelper.user.reactionData = reaction;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: const IconThemeData(color: Colors.black),
        title: Text('${reaction['page_label']} Configuration',
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
                itemCount: reaction['fields'].length,
                itemBuilder: (BuildContext context, int index) {
                  //print(reaction_data[0]['fields'][0]['field_label']);
                  return _row(
                    reaction['fields'][index]['field_inputNum'],
                    reaction['fields'][index]['field_label'],
                    reaction['fields'][index]['field_placeholder'],
                    reaction['fields'][index]['field_type'],
                    reaction['fields'][index]['field_error'],
                  );
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

  _row(key, index, hint, type, error) {
    
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
              list.add({'id': key, 'value': value, 'type': type});
            }
            Map<String, dynamic> json = {'id': key, 'value': value};
            list.add(json);
          },
        )),
      ],
    );
  }

  Widget continueButt() {
    return FloatingActionButton.extended(
        backgroundColor: Colors.black,
        label: Text('Continuer'),
        heroTag: 'continue',
        onPressed: () {
          if (formkey.currentState?.validate() == true) {
            reaction = convert_to_reaction(list, reaction);
            area = create_area(action, reaction);
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => resume_area(area: area)),
            );
          }
          ;
        });
  }
}
