import { StyleSheet, View } from "react-native";
import React from "react";

const Stack = (props) => {
  let justify;
  let align;
  let direction;

  switch (props.justify) {
    case "center":
      justify = "center";
      break;
    case "start":
      justify = "flex-start";
      break;
    case "end":
      justify = "flex-end";
      break;
    case "evenly":
      justify = "space-evenly";
      break;
    case "around":
      justify = "space-around";
      break;
    case "between":
      justify = "space-between";
      break;
    default:
      justify = "space-between";
  }

  switch (props.align) {
    case "start":
      align = "flex-start";
      break;
    case "end":
      align = "flex-end";
      break;
    case "stretch":
      align = "stretch";
      break;
    case "center":
      align = "center";
      break;
    case "baseline":
      align = "baseline";
      break;
    default:
      align = "center";
  }

  switch (props.direction) {
    case "row":
      direction = "row";
      break;
    case "row-reverse":
      direction = "row-reverse";
      break;
    case "column":
      direction = "column";
      break;
    case "column-reverse":
      direction = "column-reverse";
      break;
    default:
      direction = "column";
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
    },
  });

  return (
    <View
      justify={props.justify}
      align={props.align}
      direction={props.direction}
      style={{ ...styles.container, ...props.sx }}
    >
      {props.children}
    </View>
  );
};

export default Stack;
