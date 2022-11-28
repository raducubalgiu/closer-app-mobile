import { StyleSheet, Image, Pressable } from "react-native";

type IProps = { onPress: () => void; uri: string; size: number };

export const PhotoLibraryButton = ({ onPress, uri, size = 40 }: IProps) => {
  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
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
