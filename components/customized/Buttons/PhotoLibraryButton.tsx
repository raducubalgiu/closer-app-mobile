import { StyleSheet, Image, Pressable } from "react-native";

export const PhotoLibraryButton = ({ onPress, uri, size }) => {
  const styles = StyleSheet.create({
    image: {
      width: size ? size : 40,
      height: size ? size : 40,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "white",
    },
  });

  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
    </Pressable>
  );
};
