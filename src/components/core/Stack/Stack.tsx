import { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type IProps = {
  children: any;
  direction?: string;
  align?: string;
  justify?: string;
  sx?: ViewStyle;
};

const Stack = ({
  children,
  direction = "column",
  align = "center",
  justify = "between",
  sx = {},
}: IProps) => {
  let justifyContent: any;
  let alignItems: any;
  let flexDirection: any;

  switch (justify) {
    case "center":
      justifyContent = "center";
      break;
    case "start":
      justifyContent = "flex-start";
      break;
    case "end":
      justifyContent = "flex-end";
      break;
    case "evenly":
      justifyContent = "space-evenly";
      break;
    case "around":
      justifyContent = "space-around";
      break;
    case "between":
      justifyContent = "space-between";
      break;
    default:
      justifyContent = "space-between";
  }

  switch (align) {
    case "start":
      alignItems = "flex-start";
      break;
    case "end":
      alignItems = "flex-end";
      break;
    case "stretch":
      alignItems = "stretch";
      break;
    case "center":
      alignItems = "center";
      break;
    case "baseline":
      alignItems = "baseline";
      break;
    default:
      alignItems = "center";
  }

  switch (direction) {
    case "row":
      flexDirection = "row";
      break;
    case "row-reverse":
      flexDirection = "row-reverse";
      break;
    case "column":
      flexDirection = "column";
      break;
    case "column-reverse":
      flexDirection = "column-reverse";
      break;
    default:
      flexDirection = "column";
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection,
      alignItems,
      justifyContent,
    },
  });

  return <View style={{ ...styles.container, ...sx }}>{children}</View>;
};

export default memo(Stack);
