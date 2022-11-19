import { StyleSheet, Text } from "react-native";
import { Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

export const NoFoundMessage = ({
  title,
  description,
  iconName = "alert-circle",
  iconType = "feather",
  iconSize = 45,
  sx = {},
}) => {
  return (
    <Stack align="center" justify="center" sx={{ ...styles.container, ...sx }}>
      <Icon name={iconName} type={iconType} size={iconSize} color="#ddd" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 100, paddingHorizontal: 50 },
  title: {
    fontSize: 19,
    marginTop: 15,
    marginBottom: 5,
    color: black,
    fontWeight: "600",
  },
  description: {
    color: grey0,
    textAlign: "center",
    fontSize: 15.5,
  },
});
