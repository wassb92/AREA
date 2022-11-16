import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "components/custom/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "components/custom/Loading";

const Home = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [isLoading, setIsLoading] = useState(false);
  const state = urlParams.get("session_state");

  useEffect(() => {
    if (code) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const login = async () => {
        try {
          setIsLoading(true);
          const res = await axios.post(
            state ? `${global.API_ENDPOINT}/api/microsoft/login` : `${global.API_ENDPOINT}/api/discord/login`,
            {
              code,
            },
            config
          );
          console.log("res = ", res);
          localStorage.setItem("authToken", res.data.token);
          setIsLoading(false);
          navigate("/");
        } catch (err) {
          setIsLoading(false);
          console.log("err = ", err);
        }
      };
      login();
    }
  }, [code, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-main to-secondary">
      <div className="absolute top-0 left-0 m-5">
        <Link to="/client.apk" target="_blank" rel="noreferrer">
          <Button children="Télécharger la version mobile" />
        </Link>
      </div>
      <div className="absolute top-0 right-0 m-5">
        <Link to="/login">
          <Button children="Se connecter" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-white text-3xl font-bold mb-10">AREA CATT</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/app/dashboard">
            <Button children="Dashboard" />
          </Link>
          <Link to="/app/services">
            <Button children="Services" />
          </Link>
          <Link to="/app/my_areas">
            <Button children="Mes AREAs" />
          </Link>
          <Link to="/app/profile">
            <Button children="Profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
