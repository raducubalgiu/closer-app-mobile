import { Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

type Props = {
  size?: number;
  sx?: {};
  onPress: () => void;
};

export const RevertIconButton = ({ size = 22.5, sx = {}, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, sx]}>
      <Icon name="refresh-ccw" type="feather" color="white" size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "rgba(64, 64, 64, 0.6)",
    borderRadius: 50,
  },
});
