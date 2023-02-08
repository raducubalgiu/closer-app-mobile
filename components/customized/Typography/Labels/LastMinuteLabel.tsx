import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type IProps = { text: string; sx?: {}; sxTxt?: {}; size?: string };

export const LastMinuteLabel = ({ text, sx, sxTxt, size = "sm" }: IProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1.5,
      width: size === "sm" ? 95 : 150,
      height: size === "sm" ? 25 : 30,
    },
    text: {
      color: "white",
      fontWeight: "500",
      fontSize: size === "sm" ? 12.5 : 14,
    },
  });

  return (
    <LinearGradient
      colors={["#33C2FF", "#b3e8ff"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, sx]}
    >
      <Text style={[styles.text, sxTxt]}>{text}</Text>
    </LinearGradient>
  );
};
