import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { secondary } = theme.lightColors || {};

export const Checkmark = ({ size = 10, sx = {} }) => {
  return (
    <Icon
      name="check"
      type="entypo"
      size={size}
      color="white"
      style={{ ...styles.checkmark, ...sx }}
    />
  );
};

const styles = StyleSheet.create({
  checkmark: {
    backgroundColor: secondary,
    paddingVertical: 1.5,
    paddingHorizontal: 1.75,
    borderRadius: 50,
  },
});
