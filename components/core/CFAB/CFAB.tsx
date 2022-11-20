import { FAB } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const CFAB = ({ icon, onPress, sx }) => {
  return (
    <FAB
      activeOpacity={1}
      icon={icon}
      color={primary}
      placement="right"
      onPress={onPress}
      style={sx}
    />
  );
};
