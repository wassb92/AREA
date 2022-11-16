import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import '../mixins/validation_mixin.dart';
import 'action_screen.dart';
import 'forgotPwd_screen.dart';
import 'register_screen.dart';
import '../mixins/send_json.dart';
import 'package:get/get.dart';
import '../OAut2/google_sign.dart';

class resume_area extends StatefulWidget {
  String area;
  resume_area({required this.area});
  createState() {
    return resume_areaState(area: area);
  }
}

class resume_areaState extends State<resume_area> with NetworkingHelper {
  String area;
  resume_areaState({required this.area});
  // permet de recuperez les information stocker dans le conteneur form
  final gradient = LinearGradient(colors: [
    Colors.blue,
    Colors.purple
  ]); // parametre pour cree un texte graduelle
  static String appName = 'CATT';
  Widget build(context) {
    Map<String, dynamic> _area = jsonDecode(area);
    return Container(
      // defini la distance entre le conteneurs et l'ecran
      child: Form(
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            elevation: 0.0,
            iconTheme: const IconThemeData(color: Colors.black),
            title: Text(
              'Résumer de l\'area',
              style: TextStyle(color: Colors.black),
            ),
          ),
          body: SizedBox(
            width: 400,
            child: Column(
              // crée un container qui afficher de haut en bas des informations stocker
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                textAppname(),
                textDisplay(),
                const SizedBox(
                  height: 15.0,
                ),
                pAction(),
                const SizedBox(
                  height: 15.0,
                ),
                pAction_desc(),
                pAction_args(_area),
                const SizedBox(
                  height: 30.0,
                ),
                pReaction(),
                const SizedBox(
                  height: 15.0,
                ),
                pReaction_desc(),
                const SizedBox(
                  height: 21.0,
                ),
                pReaction_args(_area),
                const SizedBox(
                  height: 21.0,
                ),
                submitButton(),
                const SizedBox(
                  height: 27.0,
                ),
                backDashboard(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget textDisplay() {
    return Text('Connect All Things Together');
  }

  Widget pAction() {
    return Text(
        'ACTION : ${NetworkingHelper.user.actionData['page_label'].toString()}');
  }

  Widget pAction_desc() {
    return Text(
        'Description : ${NetworkingHelper.user.actionData['page_description'].toString()}');
  }

  Widget pAction_args(_area) {
    return Text('Arguments : ${_area['action']['args'].toString()}');
  }

  Widget pReaction() {
    return Text(
        'REACTION : ${NetworkingHelper.user.reactionData['page_label'].toString()}');
  }

  Widget pReaction_desc() {
    return Text(
        'Description : ${NetworkingHelper.user.reactionData['page_description'].toString()}');
  }

  Widget pReaction_args(_area) {
    return Text('Arguments : ${_area['reaction']['args'].toString()}');
  }

  Widget textAppname() {
    return ShaderMask(
      shaderCallback: (Rect bounds) {
        return gradient.createShader(Offset.zero & bounds.size);
      },
      child: Text(
        appName,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 60.0,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget submitButton() {
    String value = '';
    return ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Color.fromARGB(255, 0, 0, 0),
        ),
        child: Text('Créé AREA', textAlign: TextAlign.right),
        onPressed: () {
          sendArea(area).then((value) {
            if (value == 200) {
              ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('AREA créé avec succes')));
              NetworkingHelper.StockUserAreas();
            } else {
              ScaffoldMessenger.of(context)
                  .showSnackBar(SnackBar(content: Text('AREA non créé')));
              NetworkingHelper.StockUserAreas();
            }
          });
        });
  }

  Widget backDashboard() {
    return FloatingActionButton.extended(
        backgroundColor: Color.fromARGB(255, 0, 0, 0),
        label: Text('Retour au Dashboard'),
        heroTag: 'back dasboard',
        onPressed: () {
          NetworkingHelper.StockUserAreas();
          Navigator.pushNamedAndRemoveUntil(context, "dashboard", (r) => false);
        });
  }
}
