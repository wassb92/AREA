import 'package:area/src/mixins/validation_mixin.dart';
import 'package:area/src/screens/area_screen.dart';
import 'package:area/src/screens/sideNavBar.dart';
import 'package:flutter/material.dart';
import '../mixins/send_json.dart';
import 'package:area/src/screens/Buttons.dart';


class ServicesPage extends StatelessWidget {
  const ServicesPage();
  
  @override
  Widget build(BuildContext context) => Scaffold(
    
        appBar: AppBar(
          title: const Text('Services'),
          backgroundColor: Colors.blue,
        ),
      );
}

class loginPage extends StatelessWidget with NetworkingHelper, ValidationMixin {
  const loginPage();
  
  @override
  
  Widget build(BuildContext context) => Scaffold(
      
        drawer: sideNavBar(),
        appBar: AppBar(
          title:  ShaderMask(
            shaderCallback: (Rect bounds) {
              final formkey = GlobalKey<
              FormState>(); // permet de recuperez les information stocker dans le conteneur form
              final gradient = LinearGradient(colors: [
          Colors.blue,
            Colors.purple
             ]); // parametre
              return gradient.createShader(Offset.zero & bounds.size);
            },
            child: Text('Dashboard', style: const TextStyle(
          color: Colors.white,
          fontSize: 30.0,
          fontWeight: FontWeight.bold,
        ),)),
           backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: const IconThemeData(color: Colors.black),
        
        ),
        body: Scaffold(
          body: Center(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Padding(
                  padding: EdgeInsets.only(top: 10.0, bottom: 10.0),
                  child: Text('Bienvenue',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 20.0,
                      )),
                ),
                mail(),
            const SizedBox(
              height: 120.0,
            ),
                titleText(),
                const SizedBox(
                  height: 30.0,
                ),
                AreaButton(context),
              ],
            ),
          ),
        ),
      );

  Widget titleText() {
    final gradient = LinearGradient(colors: [
    Colors.blue,
    Colors.purple
  ]); 
      NetworkingHelper.StockUserAreas();
    return Text(
      'Vous avez ${NetworkingHelper.user.areas.length} Areas',
      textAlign: TextAlign.center,
      style: const TextStyle(
        color: Colors.black,
        fontSize: 20.0,
        fontWeight: FontWeight.bold,
      ),
    );
  }
}

Widget mail() {
  return Text(
    NetworkingHelper.user.email,
    textAlign: TextAlign.center,
    style: const TextStyle(
        color: Colors.black, fontSize: 15.0, fontWeight: FontWeight.bold),
  );
}

