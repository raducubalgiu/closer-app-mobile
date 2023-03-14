import { StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Switch } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};
type IProps = {
  title: string;
  defaultValue: boolean;
  onValueChange: () => void;
};

export const SettingListItem = ({
  title,
  defaultValue,
  onValueChange,
}: IProps) => {
  const [checked, setChecked] = useState(defaultValue);

  return (
    <Stack direction="row" sx={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Switch
        value={checked}
        onChange={() => {
          setChecked((checked) => !checked);
          onValueChange();
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 20 },
  title: {
    marginRight: 5,
    color: black,
    fontSize: 15,
  },
});
