import 'package:area/src/screens/NavBarActions.dart';
import 'package:area/src/screens/action_screen.dart';
import 'package:area/src/screens/area_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'mixins/send_json.dart';
import 'mixins/validation_mixin.dart';
import 'screens/login_screen.dart';
import 'screens/home.dart';
import 'screens/generic_action_conf.dart';

class Area extends StatelessWidget {   
  Widget build(context) {
    SystemChrome.setPreferredOrientations([
        DeviceOrientation.portraitUp,
        DeviceOrientation.portraitDown,
      ]);
    return MaterialApp(
      initialRoute: 'home',
      routes: {
        'login': (context) => LoginScreen(),
        'home': (context) => MoodyGradient(),
        'dashboard': (context) => loginPage(),
      },
      debugShowCheckedModeBanner: false,
      theme: ThemeData(scaffoldBackgroundColor: const Color(0xFFEFEFEF)),
      title: 'Log Me In!',
  home: Scaffold(
            body: LoginScreen(),
          ),
        );
  }
}
