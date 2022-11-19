import { StyleSheet, Text, Pressable } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { CustomAvatar, Stack, Checkmark } from "../../../core";
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

  const goToUser = (userId: string) => {
    navigation.push("ProfileGeneral", {
      userId,
      avatar,
      username,
      name,
    });
  };

  return (
    <Stack direction="row" sx={{ paddingHorizontal: 10 }}>
      <Pressable onPress={() => goToUser(userId)}>
        <Stack direction="row" sx={styles.avatarContainer}>
          <CustomAvatar avatar={avatar} size={35} iconSize={15} />
          <Stack align="start">
            <Stack direction="row">
              <Text style={styles.name}>{username}</Text>
              {checkmark && <Checkmark sx={{ marginLeft: 5 }} size={8} />}
            </Stack>
            <Text style={styles.profession}>{profession?.name}</Text>
          </Stack>
        </Stack>
      </Pressable>
      <Pressable onPress={onShowDetails}>
        <Icon name="more-horizontal" type="feather" size={20} />
      </Pressable>
    </Stack>
  );
};

export default memo(CardPostHeader);

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
