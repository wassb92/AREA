import 'package:flutter/material.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';


class MoodyGradient extends StatelessWidget {
  const MoodyGradient();

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment(0.8, 1),
            colors: <Color>[
            Colors.blue,
            Colors.purple
            ], 
            tileMode: TileMode.mirror,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            titleText(),
            const SizedBox(
                  height: 30.0,
                ),
            textDisplay(),
            const SizedBox(
                  height: 30.0,
                ),
            StartButt(context),
          ],
        ),
      ),
    );
  }

  Widget StartButt(context) {
    return FloatingActionButton.extended(
      backgroundColor: Colors.black,
        label: const Text('Je me connecte', ),
        onPressed: () {
          Navigator.pushNamed(context, 'login');
        });
  }

  Widget titleText() {
    return Text('CATT',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 60.0,
          fontWeight: FontWeight.bold,
        ),
      );
  }

  Widget textDisplay() {
    return Text('Connect All Things Together\n une application pour automatiser vos tâches quotidiennes',
    style: const TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.bold,
    ),
    );
  }
}
