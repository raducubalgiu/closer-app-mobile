import { StyleSheet, Text, View, Pressable } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Checkmark } from "../../../core";
import Stack from "../../../core/Stack/Stack";

type IProps = { avatar: any; username: string; checkmark: boolean };

const PostHeader = ({ avatar, username, checkmark }: IProps) => {
  return (
    <Stack direction="row">
      <View style={styles.header}>
        <CustomAvatar avatar={avatar} size={32.5} />
        <Text style={styles.username}>@{username}</Text>
        {checkmark && <Checkmark size={7.5} sx={{ marginLeft: 5 }} />}
      </View>
      <Pressable style={styles.icon}>
        <Icon name="more-horizontal" type="feather" size={20} />
      </Pressable>
    </Stack>
  );
};

export default memo(PostHeader);

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginLeft: 7.5 },
  username: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  icon: { padding: 15 },
});
