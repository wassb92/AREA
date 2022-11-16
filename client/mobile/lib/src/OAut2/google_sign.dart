import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginController extends GetxController {
  var googleSign = GoogleSignIn(forceCodeForRefreshToken: true);
  var googleAccount = Rx<GoogleSignInAccount?>(null);

  login() async {
    googleAccount.value = await googleSign.signIn();
  }

  logout() async {
    googleAccount.value = await googleSign.signOut();
  }
  
}
                                 