import { StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

export const Heading = ({ sx = {}, title = "" }) => {
  return <Text style={{ ...styles.heading, ...sx }}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    color: black,
    fontWeight: "700",
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
  },
});
