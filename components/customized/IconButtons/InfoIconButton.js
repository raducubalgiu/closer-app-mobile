import { IconButton } from "../../core";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const InfoIconButton = ({ size, color, sx, onPress }) => {
  return (
    <IconButton
      iconName="info"
      iconType="feather"
      size={size ? size : 25}
      color={color ? color : black}
      onPress={onPress}
      sx={{ ...sx }}
    />
  );
};
