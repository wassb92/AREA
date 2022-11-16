import React, { useContext, useEffect } from "react";
import { Button } from "components/custom/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";
import axios from "axios";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import OAuth2Login from "react-simple-oauth2-login";
import CloseIcon from "@mui/icons-material/Close";

const clientId = {
  google:
    "576679319913-nbljh6nd7fkvqlvnnpn5n6i973ksfeg0.apps.googleusercontent.com",
  discord: "1026824962662744095",
  facebook: "515808463478099",
  twitter: "d1NlOXNhVzRSOEJKRVlSM3dJbmg6MTpjaQ",
};

const LinkedAccount = ({ children, service, user }) => {
  const unlinkAccount = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/auth/refreshToken`,
        { user, service },
        config
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const CloseButton = () => {
    return (
      <div className="absolute top-0 right-0 -mt-3 -mr-2 hover:cursor-pointer">
        <CloseIcon
          style={{ fontSize: 30, color: "red" }}
          onClick={unlinkAccount}
        />
      </div>
    );
  };
  return (
    <div className="z-40 relative flex flex-col items-center justify-center w-full h-full">
      <CloseButton />
      <div className="bg-white text-lg p-1 w-14 h-14">{children}</div>
    </div>
  );
};

const DisplayLinkedAccount = ({ user }) => {
  return (
    <div className="flex ml-4 space-x-4">
      {user.google && (
        <LinkedAccount service="google" user={user}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            className="w-10 h-10 rounded-full"
            alt="google"
          />
        </LinkedAccount>
      )}
      {user.discord && (
        <LinkedAccount service="discord" user={user}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4945/4945973.png"
            className="w-12 h-12 rounded-full"
            alt="discord"
          />
        </LinkedAccount>
      )}
      {user.microsoft && (
        <LinkedAccount service="microsoft" user={user}>
          <img
            src="https://img.icons8.com/color/48/000000/microsoft.png"
            className="w-10 h-10 rounded-full"
            alt="micrsoft"
          />
        </LinkedAccount>
      )}
      {user.facebook && (
        <LinkedAccount service="facebook" user={user}>
          <img
            src="https://www.unipile.com/wp-content/uploads/2022/06/logo-facebook.png"
            className="w-10 h-10 rounded-full"
            alt="facebook"
          />
        </LinkedAccount>
      )}
      {user.twitter && (
        <LinkedAccount service="twitter" user={user}>
          <img
            src="https://img.icons8.com/color/48/null/twitter--v1.png"
            className="w-10 h-10 rounded-full"
            alt="twitter"
          />
        </LinkedAccount>
      )}
    </div>
  );
};

const LinkWithGoogle = () => {
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
            className="hover:scale-110 transform transition duration-500 flex items-center justify-center bg-soft text-white rounded-xl px-4"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
              className="w-10 h-10 rounded-full hover:scale-110 transform transition duration-500"
            />
            <span className="ml-2 text-sm font-medium hover:scale-110 transform transition duration-500">
              Liez votre compte Google
            </span>
          </Button>
        )}
      />
    </div>
  );
};

const LinkWithDiscord = () => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId.discord}&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F&response_type=code&scope=identify%20email`;

  return (
    <div>
      <a href={url}>
        <Button className="hover:scale-110 transform transition duration-500 flex items-center justify-center bg-soft text-white rounded-xl px-4">
          <img
            src="https://img.icons8.com/color/48/000000/discord-logo.png"
            alt="discord"
            className="w-10 h-10 rounded-full hover:scale-110 transform transition duration-500"
          />
          <span className="ml-2 text-sm font-medium hover:scale-110 transform transition duration-500">
            Liez votre compte Discord
          </span>
        </Button>
      </a>
    </div>
  );
};

const LinkWithMicrosoft = () => {
  const url =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=api%3A%2F%2F2509b78d-8e3a-41db-86b4-4a0f432d1f06&scope=user.read%20openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F&client-request-id=84b5c29b-06b5-4db3-a812-b845407525d6&response_mode=query&response_type=code&x-client-SKU=msal.js.node&x-client-VER=1.0.0&x-client-OS=linux&x-client-CPU=x64&client_info=1";

  return (
    <div>
      <a href={url}>
        <Button className="hover:scale-110 transform transition duration-500 flex items-center justify-center bg-soft text-white rounded-xl px-4">
          <img
            src="https://img.icons8.com/color/48/000000/microsoft.png"
            alt="micrsoft"
            className="w-10 h-10 rounded-full hover:scale-110 transform transition duration-500"
          />
          <span className="ml-2 text-sm font-medium hover:scale-110 transform transition duration-500">
            Liez votre compte Microsoft
          </span>
        </Button>
      </a>
    </div>
  );
};

const LinkWithFacebook = () => {
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
          className="hover:scale-110 transform transition duration-500 flex items-center justify-center bg-soft text-white rounded-xl px-4"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img
            src="https://img.icons8.com/color/48/000000/facebook-new.png"
            alt="facebook"
            className="w-10 h-10 rounded-full hover:scale-110 transform transition duration-500"
          />
          <span className="ml-2 text-sm font-medium hover:scale-110 transform transition duration-500">
            Liez votre compte Facebook
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

const LinkWithTwitter = () => {
  const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId.twitter}&redirect_uri=http://localhost:8081/app/services&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;

  return (
    <div>
      <a href={url}>
        <Button className="hover:scale-110 transform transition duration-500 flex items-center justify-center bg-soft text-white rounded-xl px-4">
          <img
            src="https://img.icons8.com/color/48/null/twitter--v1.png"
            className="w-10 h-10 rounded-full hover:scale-110 transform transition duration-500"
            alt="twitter"
          />
          <span className="ml-2 text-sm font-medium hover:scale-110 transform transition duration-500">
            Liez votre compte Twitter
          </span>
        </Button>
      </a>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold text-gray-700 mt-10 text-center">
        Bienvenue {user.email}
      </h1>
      <div className="flex text-xl m-8 items-center">
        Votre compte est lié à : <DisplayLinkedAccount user={user} />
      </div>
      <div className="left-0 ml-4 space-y-2 w-fit">
        <LinkWithGoogle />
        <LinkWithDiscord />
        <LinkWithMicrosoft />
        <LinkWithFacebook />
        <LinkWithTwitter />
      </div>
      <div className="flex justify-center">
        <div className="flex text-2xl m-8 items-center border-2 p-6 rounded-xl border-main font-bold text-gray-700">
          Vous avez {user.areas.length} AREA{user.areas.length > 1 && "s"}
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => navigate("/app/my_areas")}>
          Voir mes AREAs
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
