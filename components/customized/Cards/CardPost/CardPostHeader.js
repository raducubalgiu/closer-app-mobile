import { StyleSheet, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { CustomAvatar, Stack, Checkmark, Button } from "../../../core";
import { Icon } from "@rneui/themed";

const CardPostHeader = ({
  userId,
  avatar,
  username,
  checkmark,
  name,
  onShowDetails,
}) => {
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.push("ProfileGeneral", {
      userId,
      avatar,
      username,
      name,
    });
  };

  return (
    <Stack direction="row" sx={{ paddingHorizontal: 10 }}>
      <Button onPress={() => goToUser(userId)}>
        <Stack direction="row" sx={styles.avatarContainer}>
          <CustomAvatar avatar={avatar} size={35} iconSize={15} />
          <Stack align="start">
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.job}>Service Auto</Text>
          </Stack>
        </Stack>
      </Button>
      <Button onPress={onShowDetails}>
        <Icon name="ellipsis1" type="antdesign" />
      </Button>
    </Stack>
  );
};

export default CardPostHeader;

const styles = StyleSheet.create({
  avatarContainer: {
    marginVertical: 10,
  },
  name: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  job: {
    marginLeft: 10,
    color: theme.lightColors.black,
    fontSize: 12,
    textTransform: "capitalize",
    fontWeight: "500",
  },
});
