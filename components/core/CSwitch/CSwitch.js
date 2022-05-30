import React, { useState } from "react";
import { Switch } from "@rneui/themed";

export const CSwitch = ({ defaultValue, color, onChange }) => {
  const [checked, setChecked] = useState(defaultValue);

  const changeValue = () => {
    setChecked((checked) => !checked);
    onChange(checked);
  };

  return <Switch color={color} value={checked} onValueChange={changeValue} />;
};
