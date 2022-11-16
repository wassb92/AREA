import 'package:area/src/screens/sideNavBar.dart';
import 'package:area/src/screens/area_screen.dart';
import 'package:flutter/material.dart';

import 'login_screen.dart';

Widget AreaButton(BuildContext context) {
  return ElevatedButton(
    style: ElevatedButton.styleFrom(
      backgroundColor: Color.fromARGB(255, 0, 0, 0),
    ),
    child: Text(
      'Voir mes Areas',
      textAlign: TextAlign.center,
    ),
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => areaScreen()),
      );
    },
  );
}

Widget LogoutButton(BuildContext context) {
  return ElevatedButton(
    style: ElevatedButton.styleFrom(
      backgroundColor: Color.fromARGB(255, 0, 0, 0),
    ),
    child: Text(
      'Logout',
      textAlign: TextAlign.center,
    ),
    onPressed: () {
      LoginScreenState.controller.googleSign.signOut();
      Navigator.pushNamedAndRemoveUntil(context, "login", (r) => false);
    },
  );
}
