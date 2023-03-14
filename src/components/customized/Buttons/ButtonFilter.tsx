import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = { title: string; onPress: () => void; sx?: {}; sxText?: {} };

export const ButtonFilter = ({
  title,
  onPress,
  sx = {},
  sxText = {},
}: IProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...sx }}
      onPress={onPress}
      activeOpacity={1}
    >
      <Text style={{ ...styles.buttonText, ...sxText }}>{title}</Text>
      <Icon name="keyboard-arrow-down" color={black} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 13,
    color: black,
    fontWeight: "500",
  },
});
