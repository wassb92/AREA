import React, { useContext } from "react";
import { FormContext } from "FormContext";
import { TextInput } from "components/custom/Input";

const Input = ({
  field_id,
  field_label,
  field_placeholder,
  field_value,
  field_type,
  field_mandatory,
}) => {
  const { handleChange } = useContext(FormContext);
  const UnPlacedholder = ["time", "date", "datetime-local", "checkbox"];
  return (
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {field_label}
      </label>
      <TextInput
        type={field_type}
        id={field_id}
        required={field_mandatory === "yes"}
        aria-describedby="emailHelp"
        placeholder={!UnPlacedholder.includes(field_type) && field_placeholder}
        value={field_value}
        onChange={(event) => handleChange(field_id, event)}
      />
    </div>
  );
};

export default Input;
