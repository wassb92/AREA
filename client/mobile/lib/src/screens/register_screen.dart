import 'dart:io';

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:email_validator/email_validator.dart';
import '../mixins/send_json.dart';

class Register extends StatefulWidget {
  @override
  RegisterState createState() => RegisterState();
}

class RegisterState extends State<Register> with NetworkingHelper {
  @override
  String passwd = '';
  String confpwd = '';
  String email = '';
  static String appName = 'CATT';
  final formkey = GlobalKey<
      FormState>(); // permet de recuperez les information stocker dans le conteneur form
  final gradient = LinearGradient(colors: [
    Colors.blue,
    Colors.purple
  ]); // parametre pour cree un texte graduelle
  Widget build(BuildContext context) {
    return Container(
        child: Form(
      key: formkey,
      child: Scaffold(
        //gros container
        //margin: const EdgeInsets.all(20.0), // defini la distance entre le conteneurs et l'ecran
        body: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          textAppname(),
          emailInput(),
          pwdInput(),
          confPwdInput(),
          registerButt(context),
          backButt(context),
        ]),
      ),
    ));
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

  Widget backButt(context) {
    return ElevatedButton(
      onPressed: () {
        Navigator.pop(context);
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color.fromARGB(255, 0, 0, 0),
      ),
      child: const Text('Retour au menu'),
    );
  }

  Widget registerButt(context) {
    String value = '';
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color.fromARGB(255, 0, 0, 0),
      ),
      child: const Text('S\'inscrire'),
      onPressed: () {
        formkey.currentState?.save();
        if (formkey.currentState?.validate() == true) {
          register(email, passwd).then((value) {
              ScaffoldMessenger.of(context)
                  .showSnackBar(SnackBar(content: Text(value)));
          });
        }
      },
    );
  }

  Widget emailInput() {
    return TextFormField(
      keyboardType: TextInputType
          .emailAddress,
    textInputAction: TextInputAction.next, // defini le type de clavier pour l'ulisatuer ici avec la touche @ direct sur le clavier
      decoration: InputDecoration(
          // fonction cree en champ ou on definit le nom du champ et le texte a l'interieur
          labelText: 'Adresse Email',
          hintText: 'Mon.Addresse@Domaine.com'),
      validator: (value) => EmailValidator.validate(value ?? "")
          ? null
          : "Mauvais mot de passe ou adresse mail",
      onSaved: (value) {
        //fonction si l'inout d'utlisateur est valide
        email = value!;
      },
      onChanged: (value) {
        setState(() {
          email = value;
        });
      },// sert a afficher un message d'erreur si la validate retourne une erreur
    );
  }

  Widget pwdInput() {
    return TextFormField(
        obscureText: true,
        textInputAction: TextInputAction.next, // defini le type de clavier pour l'ulisatuer ici avec la touche @ direct sur le clavier
        decoration: InputDecoration(
            // fonction cree en champ ou on definit le nom du champ et le texte a l'interieur
            labelText: 'Mot de passe ',
            hintText: 'Mot de passe'),
        onSaved: (value) {
          //fonction si l'inout d'utlisateur est valide
          passwd = value!;
        },
        onChanged: (value) {
        setState(() {
          email = value;
        });
      },
        validator: (value) {
          if (passwd.isEmpty) {
            return 'Veuillez entrer mot un passe';
          } else {
            return null;
          }
        });
  }

  Widget confPwdInput() {
    return TextFormField(
      obscureText: true,
      keyboardType: TextInputType
          .emailAddress, // defini le type de clavier pour l'ulisatuer ici avec la touche @ direct sur le clavier
      decoration: InputDecoration(
          // fonction cree en champ ou on definit le nom du champ et le texte a l'interieur
          labelText: 'Confirmez mot de passe',
          hintText: 'Confirmez mot de passe'),
      onSaved: (value) {
        //fonction si l'inout d'utlisateur est valide
        confpwd = value!;
      },
      onChanged: (value) {
        setState(() {
          email = value;
        });
      },
      validator: (va) {
        if (confpwd.isEmpty) {
          return 'Veuillez confirmez votre mot le passe';
        }
        if (passwd != confpwd) return 'Les mot de passe ne corresponde pas';
      },
    );
  }
}
