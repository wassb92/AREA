import 'dart:io';

import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import '../mixins/validation_mixin.dart';
import 'action_screen.dart';
import 'forgotPwd_screen.dart';
import 'register_screen.dart';
import '../mixins/send_json.dart';
import 'package:get/get.dart';
import '../OAut2/google_sign.dart';

class LoginScreen extends StatefulWidget {
  createState() {
    return LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen>
    with ValidationMixin, NetworkingHelper {
  var email = TextEditingController();
  static final controller = Get.put(LoginController());
  final formkey = GlobalKey<
      FormState>(); // permet de recuperez les information stocker dans le conteneur form
  final gradient = LinearGradient(colors: [
    Colors.blue,
    Colors.purple
  ]); // parametre pour cree un texte graduelle
  String passwd = '';
  static String appName = 'CATT';
  Widget build(context) {
    return Container(
      // defini la distance entre le conteneurs et l'ecran
      child: Form(
        key: formkey,
        child: Scaffold(
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
                SizedBox(width: 300.0, child: emailField()),
                const SizedBox(
                  height: 15.0,
                ),
                SizedBox(width: 300.0, child: passwordField()),
                Align(alignment: Alignment.topRight, child: forgotPassword()),
                submitButton(NetworkingHelper.user.email, passwd, context),
                const SizedBox(
                  height: 21.0,
                ),
                googleLogin(),
                const SizedBox(
                  height: 20.0,
                ),
                textreg(),
                registerButton(),
                const SizedBox(
                  height: 20.0,
                ),
                servipButt(),
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

  Widget emailField() {
    return TextFormField(
      keyboardType: TextInputType
          .emailAddress, // defini le type de clavier pour l'ulisatuer ici avec la touche @ direct sur le clavier
      decoration: const InputDecoration(
          labelText: 'Adresse Email', hintText: 'mon.addresse@domaine.com'),
      validator: (value) => EmailValidator.validate(value ?? "")
          ? null
          : "mauvais mot de passe ou adresse mail", // sert a afficher un message d'erreur si la validate retourne une erreur
      onChanged: (value) {
        setState(() {
          NetworkingHelper.user.email = value;
        });
      },
      onSaved: (value) {
        NetworkingHelper.user.email = value!;
        //fonction si l'inout d'utlisateur est valide
        //email = value.toString();
      },
    );
  }

  Widget passwordField() {
    return TextFormField(
      obscureText: true,
      decoration: InputDecoration(
        //border: OutlineInputBorder(),
        labelText: 'Mot De Passe',
        hintText: 'mot de passe',
      ),
      validator: (value) {
        if (value!.isEmpty) {
          return 'veuillez rentrez un mot de passe';
        }
        return null;
      },
      onSaved: (value) {
        passwd = value!;
      },
      onChanged: (value) {
        setState(() {
          passwd = value;
        });
      },
    );
  }

  Widget forgotPassword() {
    return TextButton(
      style: TextButton.styleFrom(
        backgroundColor: Colors.transparent,
      ),
      child: Text('Mot de passse oublié ?'),
      onPressed: () {
        // si le bouton est presser on verifie si le deux validator d'email est pass sont valid et on appel la fonction save on stack la premiere page et apelle la suivante
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ForgotPwd()),
        );
        formkey.currentState?.reset();
      },
    );
  }

  Widget submitButton(email, passwd, context) {
    String value = '';
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: Color.fromARGB(255, 0, 0, 0),
      ),
      child: Text('Connexion', textAlign: TextAlign.right),
      onPressed: () {
        // si le bouton est presser on verifie si le deux validator d'email et pass sont valid et on appel la fonction save on stack la premiere page et apelle la suivante
        if (formkey.currentState?.validate() == true) {
          formkey.currentState?.save();
          login(email, passwd, context).then((value) {
            if (value == 200) {
              Navigator.pushNamed(context, 'dashboard');
              formkey.currentState?.reset();
            } else {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                  content: Text('Mauvais mot de passe ou adresse mail')));
            }
          });
        }
      },
    );
  }

  Widget textreg() {
    return Text('Pas encore de compte ?');
  }

  Widget registerButton() {
    return TextButton(
      style: TextButton.styleFrom(
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
      ),
      child: Text('S\'enregister'),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => Register()),
        );
        formkey.currentState?.reset();
        NetworkingHelper.user.email = '';
      },
    );
  }

  Widget googleLogin() {
    return FloatingActionButton.extended(
      label: Text('Google', style: TextStyle(fontSize: 15)),
      heroTag: 'google',
      onPressed: () {
        controller.googleSign.signIn().then((result) {
          result?.authentication.then((googleKey) {
            googleSignIn(result.email, googleKey).then((value) {
              if (value == 200) {
                NetworkingHelper.getActions().then((value) {
                  Navigator.pushNamedAndRemoveUntil(
                      context, 'dashboard', (route) => false);
                });
                formkey.currentState?.reset();
              } else {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                    content: Text('Authentification google echoué ')));
              }
            });
          });
        });
      },
      icon: Image.asset(
        "assets/imgs/google.png",
        width: 20,
        height: 20,
        fit: BoxFit.fill,
      ),
      backgroundColor: Colors.white,
      foregroundColor: Colors.black,
    );
    
  }

  Widget servipButt() {
    return TextButton(
      style: TextButton.styleFrom(
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
      ),
      child: Text('Changer ip du serveur'),
      onPressed: () {
        changeServIP(context);
      },
    );
  }
}
