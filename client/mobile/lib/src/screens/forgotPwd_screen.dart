import 'package:flutter/material.dart';
//import '../mixins/ForgotPwd.dart';
import 'package:email_validator/email_validator.dart';
import '../mixins/send_json.dart';

class ForgotPwd extends StatefulWidget {
  @override
  ForgotPwdState createState() => ForgotPwdState();
}

class ForgotPwdState extends State<ForgotPwd> with NetworkingHelper {
  @override
  static String appName = 'CATT';
  String email = '';
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
        body: SizedBox(
          width: 400,
          child: Column(mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center, children: [
            textAppname(),
            emailInput(),
            sendButt(),
            backbutt(context),
          ]),
        ),
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

  Widget emailInput() {
    return TextFormField(
      keyboardType: TextInputType
          .emailAddress, // defini le type de clavier pour l'ulisatuer ici avec la touche @ direct sur le clavier
      decoration: InputDecoration(
          labelText: 'Adresse Email',
          hintText: 'Mon.Addresse@domaine.com'),
      validator: (value) => EmailValidator.validate(value ?? "")
          ? null
          : "Veulliez rentrer une adresse mail valide ",
      onSaved: (value) {
        email = value!;
      },
    );
  }
  Widget sendButt() {
    var value = '';
    return ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color.fromARGB(255, 0, 0, 0),
        ),
        child: const Text('Envoyer'),
        onPressed: () {
          if (formkey.currentState?.validate() == true) {
            formkey.currentState?.save();
            forgotpass(email, context).then((value) {
              ScaffoldMessenger.of(context)
                  .showSnackBar( SnackBar(content: Text(value)));
            });
          }
        });
  }

  Widget backbutt(context) {
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


}
