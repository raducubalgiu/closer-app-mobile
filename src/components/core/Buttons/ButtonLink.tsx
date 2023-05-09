import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  word: string;
  color?: any;
};

export const ButtonLink = ({ onPress, word, color, ...props }: Props) => {
  const styles = StyleSheet.create({
    link: {
      color: color ? color : "#002266",
      fontWeight: color ? "500" : "400",
    },
  });

  return (
    <TouchableOpacity activeOpacity={1} {...props}>
      <Text style={styles.link}>{word}</Text>
    </TouchableOpacity>
  );
};
