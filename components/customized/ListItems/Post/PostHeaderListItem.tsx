import { StyleSheet, Text, View, Pressable } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Checkmark } from "../../../core";
import Stack from "../../../core/Stack/Stack";

type IProps = { avatar: any; username: string };

const PostHeaderListItem = ({ avatar, username }: IProps) => {
  return (
    <Stack direction="row">
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}
      >
        <CustomAvatar avatar={avatar} size={30} />
        <Text style={styles.username}>@{username}</Text>
        <Checkmark size={7.5} sx={{ marginLeft: 5 }} />
      </View>
      <Pressable style={styles.icon}>
        <Icon name="more-horizontal" type="feather" size={20} />
      </Pressable>
    </Stack>
  );
};

export default memo(PostHeaderListItem);

const styles = StyleSheet.create({
  username: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  icon: { padding: 15 },
});
