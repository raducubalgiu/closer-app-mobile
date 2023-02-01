import { Pressable } from "react-native";
import { Icon } from "@rneui/themed";

type IProps = { sx?: {}; size?: number; color?: any; onPress: () => void };

export const MoreVerticalButton = ({
  sx,
  size = 27.5,
  color = "white",
  onPress,
}: IProps) => {
  return (
    <Pressable style={sx} onPress={onPress}>
      <Icon name="more-vertical" type="feather" size={size} color={color} />
    </Pressable>
  );
};
