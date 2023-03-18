import { StyleSheet, Text, View, Pressable } from "react-native";
import { memo, useMemo, useRef } from "react";
import { Icon } from "@rneui/themed";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Checkmark, SheetModal } from "../../../core";
import Stack from "../../../core/Stack/Stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PostInfoSheet } from "../../Sheets/PostInfoSheet";

type IProps = { avatar: any; username: string; checkmark: boolean };

const PostHeader = ({ avatar, username, checkmark }: IProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 250], []);

  return (
    <>
      <Stack direction="row">
        <View style={styles.header}>
          <CustomAvatar avatar={avatar} size={32.5} />
          <Text style={styles.username}>@{username}</Text>
          {checkmark && <Checkmark size={7.5} sx={{ marginLeft: 5 }} />}
        </View>
        <Pressable
          style={styles.icon}
          onPress={() => sheetRef.current?.present()}
        >
          <Icon name="more-horizontal" type="feather" size={20} />
        </Pressable>
      </Stack>
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <PostInfoSheet onShowConfirm={() => {}} />
      </SheetModal>
    </>
  );
};

export default memo(PostHeader);

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginLeft: 7.5 },
  username: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  icon: { padding: 15 },
});
