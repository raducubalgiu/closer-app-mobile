import { StyleSheet, Text, Pressable } from "react-native";
import { useCallback, useState, memo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Stack, Checkmark } from "../../../core";
import FollowButton from "../../Buttons/FollowButton";
import theme from "../../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import * as Haptics from "expo-haptics";
import { usePost, useDelete } from "../../../../hooks";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  user: {
    avatar: any;
    id: string;
    username: string;
    name: string;
    checkmark: boolean;
  };
  isFollow?: boolean;
  sx?: {};
};

const UserListItem = ({ user, isFollow, sx = {} }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user: userContext } = useAuth();
  const { avatar, id, username, name, checkmark } = user;

  const lastItemId = useRef(id);
  const [follow, setFollow] = useState(isFollow);
  if (id !== lastItemId.current) {
    lastItemId.current = id;
    setFollow(isFollow);
  }

  const FOLLOW_ENDPOINT = `/users/${userContext?.id}/followings/${id}/follows`;

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      username,
      service: null,
      option: null,
    });
  };

  const { mutate: makePost } = usePost({
    uri: FOLLOW_ENDPOINT,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
  });

  const { mutate: makeDelete } = useDelete({
    uri: FOLLOW_ENDPOINT,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
  });

  const followHandler = useCallback(() => {
    if (!follow) {
      setFollow(true);
      makePost({});
    }
    if (follow) {
      setFollow(false);
      makeDelete();
    }
  }, [follow]);

  const isSameUser = id === userContext?.id;

  return (
    <Stack direction="row" sx={{ ...styles.container, ...sx }}>
      <Pressable style={styles.goToUser} onPress={goToUser}>
        <CustomAvatar avatar={avatar} size={50} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Stack direction="row">
            <Text style={styles.username}>{username}</Text>
            {checkmark && <Checkmark sx={{ marginLeft: 5 }} size={8} />}
          </Stack>
          <Text style={styles.name}>{name}</Text>
        </Stack>
      </Pressable>
      {!isSameUser && (
        <FollowButton isFollow={isFollow} onPress={followHandler} />
      )}
    </Stack>
  );
};

export default memo(UserListItem);

const styles = StyleSheet.create({
  container: { marginBottom: 20, paddingHorizontal: 15 },
  username: {
    fontSize: 15,
    color: black,
    fontWeight: "600",
  },
  name: {
    color: grey0,
    marginTop: 2.5,
  },
  goToUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: black,
    fontSize: 13,
  },
  followers: {
    color: grey0,
    marginTop: 2.5,
    fontSize: 13.5,
  },
});
