import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, Checkmark, CustomAvatar, Button } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";

const CardPostHeader = ({ userId, avatar, username, checkmark }) => {
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.push("ProfileGeneralStack", {
      screen: "ProfileGeneral",
      params: { userId },
    });
  };

  return (
    <Stack direction="row" sx={{ paddingHorizontal: 10 }}>
      <Button onPress={() => goToUser(userId)}>
        <Stack direction="row" sx={styles.avatarContainer}>
          <CustomAvatar avatar={avatar} size={35} iconSize={15} />
          <Stack align="start">
            <Stack direction="row">
              <Text style={styles.name}>{username}</Text>
              {checkmark && <Checkmark />}
            </Stack>
            {/* <Text style={styles.job}>Service Auto</Text> */}
          </Stack>
        </Stack>
      </Button>
    </Stack>
  );
};

export default CardPostHeader;

const styles = StyleSheet.create({
  avatarContainer: {
    marginVertical: 10,
  },
  name: { fontFamily: "Exo-SemiBold", marginLeft: 10 },
  job: {
    marginLeft: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 13,
    textTransform: "capitalize",
  },
});
