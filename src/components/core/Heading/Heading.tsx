import { StyleSheet, Text, TextStyle } from "react-native";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = { title: string; sx?: TextStyle };

export const Heading = ({ title = "", sx }: IProps) => {
  return <Text style={[styles.heading, sx]}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    color: black,
    fontWeight: "600",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
  },
});
