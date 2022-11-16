import 'package:area/src/screens/action_screen.dart';
import 'package:area/src/screens/area_screen.dart';
import 'package:flutter/material.dart';
import 'package:area/src/screens/NavBarActions.dart';
import 'package:area/src/screens/UserPage.dart';

import '../mixins/send_json.dart';
import 'login_screen.dart';

class sideNavBar extends StatelessWidget with NetworkingHelper {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            accountName: null,
            accountEmail: Text(NetworkingHelper.user.email),
            decoration: BoxDecoration(
              color: Colors.blue,
              image: DecorationImage(
                image: NetworkImage(
                    'https://oflutter.com/wp-content/uploads/2021/02/profile-bg3.jpg'),
              ),
            ),
          ),
          ListTile(
            leading: Icon(Icons.dashboard),
            title: Text('Dashboard'),
            onTap: () => {
              NetworkingHelper.StockUserAreas(),
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => loginPage()),
                    (Route<dynamic> route) => false,
                  ),
            },
          ),
          ListTile(
            leading: Icon(Icons.list),
            title: Text('Mes areas'),
            onTap: () => {
              NetworkingHelper.StockUserAreas(),
              Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => areaScreen()),
                    (Route<dynamic> route) => false,
                  ),
            },
          ),
          ListTile(
            leading: Icon(Icons.tab),
            title: Text('Créé une area'),
            onTap: () => {
              NetworkingHelper.getActions().then((value) {
                Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Actionscreen(action_list: value),
                    ),
                    (route) => false);
              }),
            },
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Profile'),
            onTap: () => {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => UserPage()),
              ),
            },
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.logout),
            title: Text('Se deconnecter'),
            onTap: () => {
              LoginScreenState.controller.googleSign.signOut(),
              Navigator.pushNamedAndRemoveUntil(context, "login", (r) => false),
            },
          ),
        ],
      ),
    );
  }
}
