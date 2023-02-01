import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type Props = { onPress: () => void; sx?: {}; size?: number; color?: any };

export const ShareIButton = ({
  onPress,
  sx = {},
  size = 24,
  color = black,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ ...sx }}>
      <Icon type="feather" name="send" size={size} color={color} />
    </TouchableOpacity>
  );
};
