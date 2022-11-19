import { StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

export const Heading = ({ sx, title }) => {
  return <Text style={{ ...styles.heading, ...sx }}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    color: theme.lightColors.black,
    fontWeight: "700",
    fontSize: 14,
    margin: 15,
  },
});
