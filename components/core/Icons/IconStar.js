import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const IconStar = ({ size, ...props }) => {
  return (
    <Icon
      type="antdesign"
      name="star"
      color={primary}
      size={size ? size : 16}
      style={props.sx}
    />
  );
};
