import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import Styles from "./CountryPicker.module.css";

const CountryPicker = ({ countries, handleCountrySelector }) => {
  
  return (
    <FormControl className={Styles.FormControl}>
      <NativeSelect defaultValue="Rwanda" onChange={(event) => handleCountrySelector(event.target.value)}>
        <option value="global">Global</option>
        {countries.length &&
          countries.map((name, id) => (
            <option value={name} key={id}>
              {name}
            </option>
          ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
