import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, CustomAvatar, Button, Checkmark } from "../../core";
import theme from "../../../assets/styles/theme";

const { grey0, black } = theme.lightColors;

export const UserListItemSimple = ({
  checkmark,
  name,
  avatar,
  profession,
  onGoToUser,
}) => {
  return (
    <Stack align="start" sx={styles.owner}>
      <Stack direction="row">
        <CustomAvatar avatar={avatar} size={50} iconSize={17.5} />
        <Button onPress={onGoToUser}>
          <Stack align="start" justify="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.ownerName}>{name}</Text>
              {checkmark && <Checkmark />}
            </Stack>
            <Text style={{ color: grey0 }}>{profession}</Text>
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  owner: { width: "100%", marginTop: 20, marginBottom: 5 },
  ownerName: {
    color: black,
    fontWeight: "600",
    fontSize: 15,
    marginRight: 5,
  },
});
