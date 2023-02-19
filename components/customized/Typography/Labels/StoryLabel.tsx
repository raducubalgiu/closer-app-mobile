import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type IProps = { text: string; sx?: {}; sxTxt?: {}; size?: string };

export const StoryLabel = ({ text, sx, sxTxt, size = "sm" }: IProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1.5,
      width: size === "sm" ? 95 : 150,
      height: size === "sm" ? 25 : 27,
    },
    text: {
      color: "white",
      fontWeight: "500",
      fontSize: size === "sm" ? 12.5 : 14,
    },
  });

  return (
    <LinearGradient
      colors={["#fe9934", "#ffd9b3"]}
      start={{ x: 0.1, y: 0.75 }}
      end={{ x: 1.5, y: 0.8 }}
      style={[styles.container, sx]}
    >
      <Text style={[styles.text, sxTxt]}>{text}</Text>
    </LinearGradient>
  );
};
