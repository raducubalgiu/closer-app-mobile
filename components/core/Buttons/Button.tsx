import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

const { primary, black } = theme.lightColors;

export const Button = ({
  variant = "contained",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  sxBtn = {},
  sxText = {},
  radius = null,
  bgColor = null,
  color = null,
  title,
  onPress,
}) => {
  let styleBtn = {};
  let styleBtnTxt = {};
  let sizes = {};

  if (variant === "contained" && !loading) {
    styleBtn = {
      backgroundColor: bgColor ? bgColor : primary,
      borderColor: bgColor ? bgColor : primary,
    };
    styleBtnTxt = { color: color ? color : "white" };
  } else if ((variant = "outlined") && !loading) {
    styleBtn = {
      backgroundColor: "white",
      borderColor: "#ddd",
    };
    styleBtnTxt = { color: black };
  } else {
    styleBtn;
    styleBtnTxt;
  }

  switch (size) {
    case "sm":
      sizes = {
        width: !fullWidth ? 100 : "100%",
        height: 35,
      };
      break;
    case "md":
      sizes = {
        width: !fullWidth ? 120 : "100%",
        height: 45,
      };
      break;
    case "lg":
      sizes = {
        width: !fullWidth ? 150 : "100%",
        height: 47.5,
      };
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
    },
    text: {
      fontWeight: "600",
      textAlign: "center",
      ...styleBtnTxt,
      ...sxText,
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={loading || disabled ? true : false}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
