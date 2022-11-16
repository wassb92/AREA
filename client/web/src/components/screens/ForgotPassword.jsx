import React, { useState } from "react";
import axios from "axios";
import { TextInput } from "components/custom/Input";
import { Button } from "components/custom/Button";
import { DisplayError, DisplaySuccess } from "components/custom/DisplayNotice";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/auth/forgotpassword`,
        { email },
        config
      );

      setSuccess(data.data);
      setError("");
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-main to-secondary">
      <form
        onSubmit={forgotPasswordHandler}
        className="p-6 shadow-2xl bg-white rounded-xl"
      >
        <Link to="/login">
          <ArrowBackIcon />
        </Link>
        <div className="text-center mb-4 text-xl font-bold">
          Mot de passe oublié
        </div>
        <div className="mb-2">
          <div className="mt-4 text-xs my-4">
            Veuillez saisir l'adresse e-mail avec laquelle vous avez enregistrez
            votre compte.
            <div>
              Une confirmation de réinitialisation du mot de passe vous sera
              envoyez.
            </div>
          </div>
          <div className="mb-2">
            <TextInput
              type="email"
              placeholder="Votre Email"
              name="email"
              id="email"
              header="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4 text-xs my-4">
            Si vous ne recevez pas de confirmation, merci de vérifier dans vos
            courriels indésirables.
          </div>
        </div>
        {error && <DisplayError message={error} />}
        {success && <DisplaySuccess message={success} />}
        <div className="flex justify-center">
          <Button type="submit" children="Envoyez l'email" />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
