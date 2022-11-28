import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors || {};

export const IconStar = ({ size = 16, sx = {} }) => {
  return (
    <Icon
      type="antdesign"
      name="star"
      color={primary}
      size={size}
      style={{ ...sx }}
    />
  );
};
