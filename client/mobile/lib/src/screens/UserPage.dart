import 'package:area/src/mixins/validation_mixin.dart';
import 'package:area/src/screens/area_screen.dart';
import 'package:area/src/screens/sideNavBar.dart';
import 'package:flutter/material.dart';
import '../mixins/send_json.dart';
import 'package:area/src/screens/Buttons.dart';

class UserPage extends StatelessWidget {
  final double coverHeight = 280;
  final double profileHeight = 144;
  const UserPage();

  @override
  Widget build(BuildContext context) => Scaffold(
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
            child: Text('Profile', style: const TextStyle(
          color: Colors.white,
          fontSize: 30.0,
          fontWeight: FontWeight.bold,
        ),)),
         backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: const IconThemeData(color: Colors.black),
        leading: BackButton(),
      ),
      body: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          buildTop(),
          buildContent(),
          const SizedBox(
            height: 160.0,
          ),
          LogoutButton(context),
        ],
      ));

  Widget buildTop() {
    final bottom = profileHeight / 2;
    final top = coverHeight - profileHeight / 2;
    return Stack(
      clipBehavior: Clip.none,
      alignment: Alignment.center,
      children: [
        Container(
          margin: EdgeInsets.only(bottom: bottom),
          child: buildCoverImage(),
        ),
        const SizedBox(
          height: 60.0,
        ),
        Positioned(
          top: top,
          child: buildProfileImage(),
        ),
      ],
    );
  }

  Widget buildCoverImage() => Container(
        color: Colors.grey,
        child: Image.network(
          'https://oflutter.com/wp-content/uploads/2021/02/profile-bg3.jpg',
          width: double.infinity,
          height: coverHeight,
          fit: BoxFit.cover,
        ),
      );

  Widget buildProfileImage() => CircleAvatar(
        radius: profileHeight / 2,
        backgroundColor: Colors.white,//grey.shade800,
        backgroundImage: NetworkImage(
            'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'),
      );

  Widget buildContent() => Column(
        children: [
          const SizedBox(height: 8),
          Text(
            NetworkingHelper.user.email,
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
        ],
      );
}