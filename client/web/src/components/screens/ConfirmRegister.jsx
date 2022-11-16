import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "components/custom/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

const ConfirmRegister = () => {
  const [message, setMessage] = useState("");
  const { confirmToken } = useParams();
  useEffect(() => {
    const confirmRegister = async () => {
      try {
        const { data } = await axios.get(
          `${global.API_ENDPOINT}/api/auth/confirmregister/${confirmToken}`
        );
      } catch (error) {
        console.log("error = ", error);
        setMessage(error?.response?.data?.error ?? "Error");
        console.log(error);
      }
    };
    confirmRegister();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-2">
      <h1 className="text-3xl font-bold">Confirmation de l'email</h1>
      <p className="text-center mb-10">
        {message
          ? message
          : "Votre email a été confirmé. Vous pouvez maintenant vous connecter."}
      </p>
      <Link to="/login">
        <Button children="Accéder à la page de connexion" />
      </Link>
    </div>
  );
};

export default ConfirmRegister;
