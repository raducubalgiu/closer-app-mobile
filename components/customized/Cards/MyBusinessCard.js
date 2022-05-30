import { StyleSheet, Text, Dimensions } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Button, Stack } from "../../core";

const width = Dimensions.get("window").width;
const { black } = theme.lightColors;

const MyBusinessCard = ({
  sx,
  onPress,
  iconName,
  iconType,
  size,
  title,
  description,
}) => {
  return (
    <Button sx={{ ...styles.container, ...sx }} onPress={onPress}>
      <Stack
        sx={{
          width: "100%",
          maxWidth: width / 2,
        }}
      >
        <Icon
          name={iconName}
          type={iconType}
          size={size ? size : 30}
          color={black}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
    </Button>
  );
};

export default MyBusinessCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 5,
    flex: 1,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    marginVertical: 10,
    fontSize: 15,
    color: theme.lightColors.black,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
  },
});
