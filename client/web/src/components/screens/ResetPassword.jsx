import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DisplayError, DisplaySuccess } from "components/custom/DisplayNotice";
import { TextInput } from "components/custom/Input";
import { Button } from "components/custom/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { resetToken } = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Les mots de passe ne sont pas identiques");
    }

    try {
      const { data } = await axios.put(
        `${global.API_ENDPOINT}/api/auth/passwordreset/${resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      console.log("error = ", error);
      setError(error?.response?.data?.error ?? "Error");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-main to-secondary">
      <form
        onSubmit={resetPasswordHandler}
        className="p-6 shadow-2xl bg-white rounded-xl"
      >
        <Link to="/login">
          <ArrowBackIcon />
        </Link>
        <div className="p-6 space-y-4">
          <div className="text-center mb-4 text-xl font-bold">
            Mot de passe oublié
          </div>
          {error && <DisplayError message={error} />}
          {success && (
            <DisplaySuccess message={success}>
              <Link to="/login">Login</Link>
            </DisplaySuccess>
          )}
          <div className="mb-2">
            <TextInput
              type="password"
              name="password"
              id="password"
              header="Nouveau mot de passe"
              placeholder="Entrer le nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <TextInput
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              header="Confirmation du nouveau mot de passe"
              placeholder="Confirmez le nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="mt-4">
              <Link to="/login" className="underline underline-offset-1">
                Se connecter
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" children="Réinitialiser le mot de passe" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
