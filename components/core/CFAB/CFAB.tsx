import { FAB } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const CFAB = ({ icon, onPress, bottom = false }) => {
  return (
    <FAB
      activeOpacity={1}
      icon={icon}
      color={primary}
      placement="right"
      onPress={onPress}
      style={bottom && { bottom: bottom }}
    />
  );
};
