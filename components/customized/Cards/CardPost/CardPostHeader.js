import { StyleSheet, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { CustomAvatar, Stack, Checkmark, Button } from "../../../core";
import { Icon } from "@rneui/themed";

const { grey0 } = theme.lightColors;

const CardPostHeader = ({
  userId,
  avatar,
  username,
  checkmark,
  profession,
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
            <Text style={styles.profession}>{profession?.name}</Text>
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
  profession: {
    marginLeft: 10,
    color: grey0,
    fontSize: 12.5,
    textTransform: "capitalize",
    fontWeight: "500",
  },
});
