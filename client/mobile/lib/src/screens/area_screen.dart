import 'dart:convert';
import 'dart:io';

import 'package:area/src/screens/NavBarActions.dart';
import 'package:area/src/screens/sideNavBar.dart';
import 'package:flutter/material.dart';
import '../mixins/send_json.dart';
import '../mixins/user_class.dart';
import '../mixins/validation_mixin.dart';

class areaScreen extends StatelessWidget
    with NetworkingHelper, ValidationMixin {
      Widget all = Text('All');
  final gradient = const LinearGradient(colors: [Colors.blue, Colors.purple]);
  @override
  Widget build(BuildContext context) {
    if (NetworkingHelper.user.areas.length == 0)
        all = proposeAreas(context);
    else
        all = areas_list();
    return Scaffold(
      drawer: sideNavBar(),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: const IconThemeData(color: Colors.black),
        title: ShaderMask(
          shaderCallback: (Rect bounds) {
            return gradient.createShader(Offset.zero & bounds.size);
          },
          child: const Text(
            'Gestion des Areas',
            style: TextStyle(
              color: Colors.black,
              fontSize: 30.0,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () {
          NetworkingHelper.StockUserAreas();
          return Navigator.pushReplacement(
    context, 
    PageRouteBuilder(
        pageBuilder: (context, animation1, animation2) => areaScreen(),
        transitionDuration: Duration.zero,
        reverseTransitionDuration: Duration.zero,
    ),
);
        },
        child: all,
    ));
  }
}
