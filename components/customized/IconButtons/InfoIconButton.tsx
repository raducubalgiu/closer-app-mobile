import { IconButton } from "../../core";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const InfoIconButton = ({
  size = 25,
  color = black,
  sx = {},
  onPress,
}) => {
  return (
    <IconButton
      name="info"
      size={size}
      color={color}
      onPress={onPress}
      sx={sx}
    />
  );
};
