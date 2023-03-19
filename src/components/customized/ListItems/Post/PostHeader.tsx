import { StyleSheet, Text, View, Pressable } from "react-native";
import { memo, useMemo, useRef } from "react";
import { Icon } from "@rneui/themed";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Checkmark, SheetModal } from "../../../core";
import Stack from "../../../core/Stack/Stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PostInfoSheet } from "../../Sheets/PostInfoSheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type IProps = { avatar: any; username: string; checkmark: boolean };

const PostHeader = ({ avatar, username, checkmark }: IProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 250], []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onGoToUser = () => {
    navigation.navigate("ProfileGeneral", {
      username,
      service: null,
      option: null,
    });
  };

  return (
    <>
      <Stack direction="row">
        <Pressable onPress={onGoToUser}>
          <Stack direction="row" sx={styles.header}>
            <CustomAvatar avatar={avatar} size={32.5} />
            <Text style={styles.username}>@{username}</Text>
            {checkmark && <Checkmark size={7.5} sx={{ marginLeft: 5 }} />}
          </Stack>
        </Pressable>
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
  header: { marginLeft: 7.5 },
  username: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  icon: { padding: 15 },
});
