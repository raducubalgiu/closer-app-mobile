import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
} from "react-native";
import theme from "../../../../assets/styles/theme";

const { primary, black, grey0 } = theme.lightColors || {};

type Props = PressableProps & {
  variant?: string;
  loading?: boolean;
  size?: string;
  sxBtn?: {};
  sxText?: {};
  radius?: number | undefined;
  bgColor?: string | undefined;
  color?: string | undefined;
  title: string;
};

interface StyleBtn {
  backgroundColor: string | undefined;
  borderColor: string | undefined;
}
interface StyleBtnText {
  color: string | undefined;
}

export const Button = ({
  variant = "contained",
  loading,
  size = "md",
  sxBtn = {},
  sxText = {},
  radius = undefined,
  bgColor = undefined,
  color = undefined,
  title = "",
  ...props
}: Props) => {
  const { disabled } = props;
  let styleBtn: StyleBtn;
  let styleBtnTxt: StyleBtnText;
  let sizes = {};

  switch (variant) {
    case "contained":
      styleBtn = {
        backgroundColor: bgColor ? bgColor : primary,
        borderColor: bgColor ? bgColor : primary,
      };
      styleBtnTxt = { color: color ? color : "white" };
      break;
    case "outlined":
      styleBtn = {
        backgroundColor: "white",
        borderColor: "#ddd",
      };
      styleBtnTxt = { color: color ? color : black };
      break;
    default:
      styleBtn = {
        backgroundColor: bgColor ? bgColor : primary,
        borderColor: bgColor ? bgColor : primary,
      };
      styleBtnTxt = { color: color ? color : "white" };
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
      {...props}
      style={styles.container}
      disabled={loading || disabled ? true : false}
    >
      {loading ? (
        <ActivityIndicator color={disabled ? grey0 : "white"} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
