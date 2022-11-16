import React, { useContext } from "react";
import { FormContext } from "FormContext";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MySelect = ({
  field_id,
  field_label,
  field_placeholder,
  field_value,
  field_options,
}) => {
  const { handleChange } = useContext(FormContext);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{field_label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(event) => handleChange(field_id, event)}
        >
          {field_options.length > 0 &&
            field_options.map((option, i) => (
              <MenuItem value={option.option_label} key={i}>
                {option.option_label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MySelect;
