import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, Checkmark, CustomAvatar, Button } from "../../../core";
import { useAuth } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";

export const CardPostHeader = ({ userId, avatar, username, checkmark }) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const goToUser = (userId) => {
    if (user?._id === userId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("ProfileGeneralStack", {
        screen: "ProfileGeneral",
        params: { userId },
      });
    }
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
