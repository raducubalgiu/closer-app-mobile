import { useState } from "react";
import { Switch } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors || {};

type Props = {
  defaultValue: boolean;
  color: string | undefined;
  onChange: (checked: boolean) => void;
};

export const CSwitch = ({
  defaultValue = false,
  color = primary,
  onChange,
}: Props) => {
  const [checked, setChecked] = useState<boolean>(defaultValue);

  const changeValue = () => {
    setChecked((checked) => !checked);
    onChange(checked);
  };

  return <Switch color={color} value={checked} onValueChange={changeValue} />;
};
