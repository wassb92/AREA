import React from "react";
import Input from "./Input";
import Select from "./Select";

const Element = ({
  field: {
    field_type,
    field_id,
    field_label,
    field_placeholder,
    field_value,
    field_options,
    field_mandatory,
  },
}) => {
  switch (field_type) {
    case "text":
    case "number":
    case "email":
    case "password":
    case "textarea":
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_type={field_type}
          field_mandatory={field_mandatory}
        />
      );
    case "select":
      return (
        <Select
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_options={field_options}
        />
      );

    default:
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_type={field_type}
          field_mandatory={field_mandatory}
        />
      );
  }
};

export default Element;
