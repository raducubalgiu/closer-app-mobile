import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Checkmark, CustomAvatar, Stack } from "../../../../core";
import { RootStackParams } from "../../../../../navigation/rootStackParams";

type IProps = {
  avatar: any;
  username: string;
  checkmark: boolean;
  postType: string;
  onOpenSheet: () => void;
};

const PostHeader = ({
  avatar,
  username,
  checkmark,
  postType,
  onOpenSheet,
}: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onGoToUser = () => {
    navigation.push("ProfileGeneral", {
      username,
      service: null,
      option: null,
    });
  };

  return (
    <Stack direction="row">
      <Pressable onPress={onGoToUser}>
        <Stack direction="row" sx={styles.header}>
          <CustomAvatar avatar={avatar} size={32.5} />
          <Text
            style={{
              ...styles.username,
              color: postType === "photo" ? "black" : "white",
            }}
          >
            @{username}
          </Text>
          {checkmark && <Checkmark size={7.5} sx={{ marginLeft: 5 }} />}
        </Stack>
      </Pressable>
      <Pressable style={styles.icon} onPress={onOpenSheet}>
        <Icon
          name="more-horizontal"
          type="feather"
          size={20}
          color={postType === "photo" ? "black" : "white"}
        />
      </Pressable>
    </Stack>
  );
};

export default memo(PostHeader);

const styles = StyleSheet.create({
  header: { marginLeft: 7.5 },
  username: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  icon: { padding: 15 },
});
