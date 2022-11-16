import React, { useState, useEffect } from "react";
import { TextInput } from "components/custom/Input";
import { Button } from "components/custom/Button";
import axios from "axios";
import { DisplayError } from "components/custom/DisplayNotice";
import { Link, useNavigate } from "react-router-dom";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import HomeIcon from "@mui/icons-material/Home";
import OAuth2Login from "react-simple-oauth2-login";

const clientId = {
  google:
    "576679319913-nbljh6nd7fkvqlvnnpn5n6i973ksfeg0.apps.googleusercontent.com",
  discord: "1026824962662744095",
  facebook: "515808463478099",
};

const NeedRegister = () => {
  return (
    <span className="mt-4 text-xs block py-4">
      Vous n'avez pas de compte ?{" "}
      <Link className="text-blue-500 " to="/register">
        S'enregistrer
      </Link>
    </span>
  );
};

const ForgetPassword = () => {
  return (
    <div>
      <Link to="/forgotpassword" className="underline underline-offset-1">
        Mot de passe oublié ?
      </Link>
    </div>
  );
};

const LoginDelimiter = () => {
  return (
    <div>
      <fieldset className="border-t border-slate-300">
        <legend className="w-10 h-10 mx-auto px-4 text-gray-700 border-2 border-main rounded-full text-xl mono-font">
          <div className="mt-px -ml-[9px]">ou</div>
        </legend>
      </fieldset>
    </div>
  );
};

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const onSuccess = async (response) => {
    const { code } = response;

    try {
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/google/login`,
        {
          code: code,
        }
      );
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  useEffect(() => {
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: clientId.google,
      });
    });
  }, []);
  return (
    <div>
      <GoogleLogin
        clientId={clientId.google}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        prompt="consent"
        accessType="offline"
        responseType="code"
        render={(renderProps) => (
          <Button
            className="flex items-center justify-center w-full h-10 bg-white hover:bg-soft hover:text-white text-gray-700 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
              className="w-6 h-6"
            />
            <span className="ml-2 text-sm font-medium">
              Se connecter avec Google
            </span>
          </Button>
        )}
      />
    </div>
  );
};

const DiscordOAuth = () => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId.discord}&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F&response_type=code&scope=identify%20email`;

  return (
    <div>
      <a href={url}>
        <Button className="flex items-center justify-center w-full h-10 bg-white hover:bg-soft hover:text-white text-gray-700 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main">
          <img
            src="https://img.icons8.com/color/48/000000/discord-logo.png"
            alt="discord"
            className="w-6 h-6"
          />
          <span className="ml-2 text-sm font-medium">
            Se connecter avec Discord
          </span>
        </Button>
      </a>
    </div>
  );
};

const MicrosoftOAuth = () => {
  const url =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=api%3A%2F%2F2509b78d-8e3a-41db-86b4-4a0f432d1f06&scope=user.read%20openid%20profile%20offline_access%20mail.send&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F&client-request-id=84b5c29b-06b5-4db3-a812-b845407525d6&response_mode=query&response_type=code&x-client-SKU=msal.js.node&x-client-VER=1.0.0&x-client-OS=linux&x-client-CPU=x64&client_info=1";

  return (
    <div>
      <a href={url}>
        <Button className="flex items-center justify-center w-full h-10 bg-white hover:bg-soft hover:text-white text-gray-700 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main">
          <img
            src="https://img.icons8.com/color/48/000000/microsoft.png"
            alt="micrsoft"
            className="w-6 h-6"
          />
          <span className="ml-2 text-sm font-medium">
            Se connecter avec Microsoft
          </span>
        </Button>
      </a>
    </div>
  );
};

const FacebookOAuth = () => {
  const navigate = useNavigate();
  const onSuccess = async (response) => {
    const { code } = response;
    try {
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/facebook/login`,
        {
          code: code,
        }
      );
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  return (
    <OAuth2Login
      render={(renderProps) => (
        <Button
          className="flex items-center justify-center w-full h-10 bg-white hover:bg-soft hover:text-white text-gray-700 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img
            src="https://img.icons8.com/color/48/000000/facebook-new.png"
            alt="facebook"
            className="w-6 h-6"
          />
          <span className="ml-2 text-sm font-medium">
            Se connecter avec Facebook
          </span>
        </Button>
      )}
      authorizationUrl="https://www.facebook.com/v11.0/dialog/oauth"
      responseType="code"
      clientId={clientId.facebook}
      redirectUri="http://localhost:8081"
      accessType="offline"
      scope="public_profile"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

const OAuth2 = () => {
  return (
    <div className="w-full space-y-2 bg-gradient-to-br from-secondary to-main p-4 rounded-xl">
      <GoogleOAuth />
      <DiscordOAuth />
      <MicrosoftOAuth />
      <FacebookOAuth />
    </div>
  );
};

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/auth/login`,
        user,
        config
      );
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 3 * 1000);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-main to-secondary">
      <div className="flex justify-center ">
        <Button
          className="px-10 py-2 bg-soft text-white rounded-md hover:bg-main hover:drop-shadow-md duration-200 ease-in border my-6"
          children={<HomeIcon className="w-6 h-6" />}
          onClick={() => navigate("/")}
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="px-10 pt-10 bg-white rounded-xl drop-shadow-lg space-y-5">
          <h1 className="text-center text-3xl">Se connecter</h1>
          <OAuth2 />
          <LoginDelimiter />
          <div className="flex flex-col space-y-2">
            <TextInput
              type="email"
              placeholder="Votre email"
              name="email"
              id="email"
              header="Email"
              value={user.email}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <TextInput
              type="password"
              placeholder="Votre mot de passe"
              name="password"
              id="password"
              header="Password"
              value={user.password}
              onChange={handleChange}
              required={true}
            />
          </div>
          <ForgetPassword />
          {error && <DisplayError message={error} />}
          <div className="flex justify-center mt-4">
            <Button type="submit" children="Connexion" onClick={loginHandler} />
          </div>
          <NeedRegister />
        </div>
      </div>
    </div>
  );
};

export default Login;
