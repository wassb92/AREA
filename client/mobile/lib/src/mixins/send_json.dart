import 'dart:convert';
import 'package:area/src/mixins/user_class.dart';
import 'package:http/http.dart' as http;
import 'dart:developer';
import 'dart:io' show Platform;

class NetworkingHelper {
  static String localhost = Platform.isAndroid ? '10.0.2.2' : 'localhost';
  static String? ip = null;
  static User user = User();
  Future<int> login(String email, String password, context) async {
    localhost = ip ?? localhost;
    var body = {'email': email, 'password': password};
    http.Response response = await http.post(
      Uri.parse('http://$localhost:8080/api/auth/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body),
    );
    Map<String, dynamic> map = jsonDecode(response.body);
    if (response.statusCode == 200) {
      user.token = map['token'];
      user.email = email;
      return StockUserAreas();
    }
    return response.statusCode;
  }
  static Future<int> StockUserAreas() async {
    localhost = ip ?? localhost;
    http.Response response = await http.get(
      Uri.parse('http://$localhost:8080/api/private/account'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ${user.token}'
      },
    );
    //print(response.body);
    Map<String, dynamic> result = jsonDecode(response.body);

    user.id = result['user']['_id'];
    user.areas = result['user']['areas'];
    user.brutData = result['user'];
    return response.statusCode;
  }

  Future<String> register(String email, String password) async {
    localhost = ip ?? localhost;
    var user = {'email': email, 'password': password};

    http.Response response = await http.post(
      Uri.parse('http://$localhost:8080/api/auth/register'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(user),
    );

    Map<String, dynamic> map = jsonDecode(response.body);
    if (map['data'] == null) {
      return map['error'];
    } else {
      return map['data'];
    }
  }

  Future<String> forgotpass(String email, context) async {
    localhost = ip ?? localhost;
    var user = {'email': email};

    http.Response response = await http.post(
      Uri.parse('http://$localhost:8080/api/auth/forgotpassword'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(user),
    );
    Map<String, dynamic> map = jsonDecode(response.body);
    if (map['data'] == null)
      return map['error'];
    else
      return map['data'];
  }

  Future<int> googleSignIn(email, googleKey) async {
    localhost = ip ?? localhost;
    var data = {
      'email': email,
      'accessToken': googleKey.accessToken.toString()
    };

    http.Response response = await http.post(
      Uri.parse('http://$localhost:8080/api/google/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(data),
    );

    print(response.statusCode);
    if (response.statusCode != 200) {
      return 1;
    }
    Map<String, dynamic> map = jsonDecode(response.body);
    user.token = map['token'];
    user.email = email;
    return StockUserAreas();
  }

  static Future<List<dynamic>> getActions() async {
    localhost = ip ?? localhost;
    http.Response response =
        await http.get(Uri.parse('http://$localhost:8080/api/area/actions'));
    List<dynamic> result = jsonDecode(response.body);
    return result;
  }

  Future<List<dynamic>> getReactions() async {
    localhost = ip ?? localhost;
    final http.Response response =
        await http.get(Uri.parse('http://$localhost:8080/api/area/reactions'));
    List<dynamic> result = jsonDecode(response.body);
    return result;
  }




  Future<Map<String, dynamic>> getActionsData(route) async {
    localhost = ip ?? localhost;
    final http.Response response =
        await http.get(Uri.parse('http://$localhost:8080/api$route'));
    Map<String, dynamic> result = jsonDecode(response.body);
    return result;
  }

  Future<Map<String, dynamic>> getReactionsData(route) async {
    localhost = ip ?? localhost;
    final http.Response response =
        await http.get(Uri.parse('http://$localhost:8080/api$route'));
    Map<String, dynamic> result = jsonDecode(response.body);
    return result;
  }

  Future<int> sendArea(String area) async {
    print(area);
    localhost = ip ?? localhost;
    final http.Response response =
        await http.post(Uri.parse('http://$localhost:8080/api/area'),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ${user.token}'
            },
            body: area);
    Map<String, dynamic> result = jsonDecode(response.body);
    return response.statusCode;
  }

  static Future<int> deleteArea(String areaId) async {
    localhost = ip ?? localhost;
    final http.Response response = await http.delete(
      Uri.parse('http://$localhost:8080/api/area/$areaId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ${user.token}'
      },
    );

    Map<String, dynamic> result = jsonDecode(response.body);
    //print(response.body);
    return response.statusCode;
  }
}
