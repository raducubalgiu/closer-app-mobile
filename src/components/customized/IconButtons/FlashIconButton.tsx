import { StyleSheet, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { FlashMode } from "expo-camera";

type IProps = { onFlash: () => void; flash: FlashMode };

export const FlashIconButton = ({ onFlash, flash }: IProps) => {
  let flashIcon;

  switch (flash) {
    case FlashMode.auto:
      flashIcon = "flash-auto";
      break;
    case FlashMode.on:
      flashIcon = "flash";
      break;
    case FlashMode.off:
      flashIcon = "flash-off";
      break;
    default:
      flashIcon = "flash";
  }

  return (
    <Pressable style={styles.btn} onPress={onFlash}>
      <Icon
        name={flashIcon}
        type="material-community"
        color="white"
        size={20}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: "rgba(64, 64, 64, 0.6)",
    borderRadius: 50,
  },
});
