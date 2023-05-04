import { StyleSheet, Pressable } from "react-native";
import { Icon } from "@rneui/themed";

type IProps = {
  name: string;
  type?: string;
  size?: number;
  onPress: () => void;
};

export const CameraReusableIconButton = ({
  name,
  type = "material",
  size = 27.5,
  onPress,
}: IProps) => {
  return (
    <Pressable style={styles.icon} onPress={onPress}>
      <Icon name={name} type={type} size={size} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
