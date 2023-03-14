import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = { onPress: () => void; word: string; color?: any };

export const ButtonLink = ({ onPress, word, color }: Props) => {
  const styles = StyleSheet.create({
    link: {
      color: color ? color : "#002266",
      fontWeight: color ? "500" : "400",
    },
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Text style={styles.link}>{word}</Text>
    </TouchableOpacity>
  );
};
