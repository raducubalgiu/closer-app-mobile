import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

export const IconStar = ({ size, ...props }) => {
  return (
    <Icon
      type="antdesign"
      name="star"
      color={theme.lightColors.primary}
      size={size ? size : 16}
      style={props.sx}
    />
  );
};
