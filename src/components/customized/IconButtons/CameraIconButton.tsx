import { Pressable } from "react-native";
import { Icon } from "@rneui/themed";

type IProps = { onPress: () => void; sx?: {}; size?: number };

export const CameraIconButton = ({ onPress, sx, size = 85 }: IProps) => {
  return (
    <Pressable onPress={onPress} style={sx}>
      <Icon
        name="ios-radio-button-on-outline"
        type="ionicon"
        color="white"
        size={size}
      />
    </Pressable>
  );
};
