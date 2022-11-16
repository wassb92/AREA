import React, { useState, useEffect } from "react";
import Element from "components/form/Element";
import { FormContext } from "FormContext";
import axios from "axios";
import { Button } from "components/custom/Button";
import { useNavigate } from "react-router-dom";
import { DisplaySuccess, DisplayError } from "components/custom/DisplayNotice";

const ReactionForm = ({ formJSON, action }) => {
  const navigate = useNavigate();

  const [elements, setElements] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  setTimeout(() => {
    setError(false);
    setSuccess(false);
  }, 5000);

  useEffect(() => {
    const getReactions = async () => {
      try {
        const res = await axios.get(
          `${global.API_ENDPOINT}/api/area/reactions`
        );
        setReactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReactions();
  }, []);

  useEffect(() => {
    setElements(formJSON);
  }, [formJSON]);

  const { fields, page_label, page_description, action_name } = elements ?? {};

  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case "checkbox":
            field["field_value"] = event.target.checked;
            break;

          default:
            field["field_value"] = event.target.value;
            break;
        }
      }
      setElements(newElements);
    });
  };

  const handleValidation = async (event) => {
    event.preventDefault();

    const { fields } = elements;
    const reaction = {
      name: elements.reaction_name,
      args: {
        ...Object.fromEntries(
          fields.map(({ field_id, field_value }) => [field_id, field_value])
        ),
      },
    };
    const allFieldsFilled = Object.values(reaction.args).every(
      (field) => field !== ""
    );
    if (!allFieldsFilled) {
      setError("Un ou plusieurs champs sont vides");
      return;
    }
    const area = {
      action: action,
      reaction: reaction,
    };
    console.log("area = ", area);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const res = await axios.post(
        `${global.API_ENDPOINT}/api/area`,
        area,
        config
      );
      console.log(res);
      setSuccess("AREA créée avec succès !");
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
      window.location.href = "/app/my_areas";
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error ?? "Une erreur est survenue");
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  return (
    <div>
      <FormContext.Provider value={{ handleChange }}>
        <div className="flex justify-center items-center flex-col">
          <form>
            <div className="flex- justify-center">
              {fields &&
                fields.map((field, i) => <Element key={i} field={field} />)}
            </div>
          </form>
        </div>
      </FormContext.Provider>
      {error && <DisplayError message={error} />}
      {success && <DisplaySuccess message={success} />}
      <div className="space-x-10 space-y-4 pb-4 mt-6">
        <Button children="Annuler" onClick={() => navigate(-1)} />
        <Button children="Valider" onClick={handleValidation} />
      </div>
    </div>
  );
};

export default ReactionForm;
