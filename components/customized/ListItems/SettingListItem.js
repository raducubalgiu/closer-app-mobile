import { StyleSheet, Text } from "react-native";
import { CSwitch, Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const SettingListItem = ({
  title,
  defaultValue,
  onChange,
  sx,
  sxTitle,
}) => {
  return (
    <Stack direction="row" sx={{ ...styles.container, ...sx }}>
      <Text style={{ ...styles.title, ...sxTitle }}>{title}</Text>
      <CSwitch value={defaultValue} onChange={onChange} />
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
