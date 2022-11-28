import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = { onPress: () => void; word: string };

export const ButtonLink = ({ onPress, word }: Props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Text style={styles.link}>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#002266",
  },
});
