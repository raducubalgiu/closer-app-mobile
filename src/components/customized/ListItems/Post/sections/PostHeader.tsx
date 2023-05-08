import { StyleSheet, Text, Pressable } from "react-native";
import { memo, useMemo, useRef } from "react";
import { Icon } from "@rneui/themed";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Checkmark, SheetModal, CustomAvatar, Stack } from "../../../../core";
import { PostInfoSheet } from "../../../Sheets/PostInfoSheet";
import { RootStackParams } from "../../../../../navigation/rootStackParams";
import { useAuth, useDelete } from "../../../../../hooks";

type IProps = {
  avatar: any;
  username: string;
  checkmark: boolean;
  postType: string;
  postId: string;
};

const PostHeader = ({
  avatar,
  username,
  checkmark,
  postType,
  postId,
}: IProps) => {
  const { user } = useAuth();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 250], []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onGoToUser = () => {
    navigation.push("ProfileGeneral", {
      username,
      service: null,
      option: null,
    });
  };

  const { mutate } = useDelete({
    uri: `/users/${user?.id}/posts/${postId}`,
    onSuccess: () => {
      sheetRef.current?.close();
    },
  });

  return (
    <>
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
        <Pressable
          style={styles.icon}
          onPress={() => sheetRef.current?.present()}
        >
          <Icon
            name="more-horizontal"
            type="feather"
            size={20}
            color={postType === "photo" ? "black" : "white"}
          />
        </Pressable>
      </Stack>
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <PostInfoSheet onDelete={mutate} />
      </SheetModal>
    </>
  );
};

export default memo(PostHeader);

const styles = StyleSheet.create({
  header: { marginLeft: 7.5 },
  username: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  icon: { padding: 15 },
});
