import { useState } from "react";
import { Switch } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const CSwitch = ({
  defaultValue = false,
  color = primary,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultValue);

  const changeValue = () => {
    setChecked((checked) => !checked);
    onChange(checked);
  };

  return <Switch color={color} value={checked} onValueChange={changeValue} />;
};
