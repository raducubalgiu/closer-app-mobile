import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

const { primary, black, grey0 } = theme.lightColors;

interface StyleBtn {
  backgroundColor: string;
  borderColor: string;
}
interface StyleBtnText {
  color: string;
}

export const Button = ({
  variant = "contained",
  size = "md",
  loading = false,
  disabled = false,
  sxBtn = {},
  sxText = {},
  radius = null,
  bgColor = null,
  title,
  onPress,
}) => {
  let styleBtn: StyleBtn;
  let styleBtnTxt: StyleBtnText;
  let sizes = {};

  switch (variant) {
    case "contained":
      styleBtn = {
        backgroundColor: bgColor ? bgColor : primary,
        borderColor: bgColor ? bgColor : primary,
      };
      styleBtnTxt = { color: "white" };
      break;
    case "outlined":
      styleBtn = {
        backgroundColor: "white",
        borderColor: "#ddd",
      };
      styleBtnTxt = { color: black };
      break;
    default:
      styleBtn = {
        backgroundColor: bgColor ? bgColor : primary,
        borderColor: bgColor ? bgColor : primary,
      };
      styleBtnTxt = { color: "white" };
  }

  switch (size) {
    case "sm":
      sizes = { height: 35 };
      break;
    case "md":
      sizes = { height: 45 };
      break;
    case "lg":
      sizes = { height: 47.5 };
      break;
  }

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: radius ? radius : 2.5,
      ...sizes,
      ...styleBtn,
      ...sxBtn,
      backgroundColor: disabled ? "#eee" : styleBtn.backgroundColor,
      borderColor: disabled ? "#eee" : styleBtn.borderColor,
    },
    text: {
      fontWeight: "600",
      textAlign: "center",
      ...styleBtnTxt,
      ...sxText,
      color: disabled ? grey0 : styleBtnTxt.color,
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={loading || disabled ? true : false}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
