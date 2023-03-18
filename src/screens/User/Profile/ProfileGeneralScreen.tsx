import { StyleSheet, View, Text } from "react-native";
import { useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import {
  useAuth,
  useGet,
  useGetMutate,
  usePost,
  useDelete,
} from "../../../hooks";
import {
  HeaderProfileGeneral,
  ProfileIconButton,
  FollowProfileButton,
} from "../../../components/customized";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Protected, SheetModal } from "../../../components/core";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import Profile from "../../../components/customized/Profile/Profile";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type IProps = NativeStackScreenProps<RootStackParams, "ProfileGeneral">;

export const ProfileGeneralScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, checkmark } = route.params;
  const { service, option } = route.params;
  const [isFollow, setIsFollow] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const snapPoints = useMemo(() => [1, 500], []);
  const settingsRef = useRef<BottomSheetModal>(null);

  const { data: userDetails } = useGet({
    model: "fetchUser",
    uri: `/users/${user?.id}/user/${username}`,
    onSuccess: (res) => {
      setIsFollow(res.data.isFollow);
      setIsBlocked(res.data.isBlocked);
    },
  });

  const {
    data: suggested,
    mutate: handleSuggested,
    isLoading,
  } = useGetMutate({ uri: `/users/suggested` });

  const { mutate: follow } = usePost({
    uri: `/users/${user?.id}/followings/${userId}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(true);
      handleSuggested();
    },
  });

  const { mutate: unfollow } = useDelete({
    uri: `/users/${user?.id}/followings/${userId}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(false);
    },
  });

  const { mutate: unblock } = useDelete({
    uri: `/users/${user?.id}/blocks/${userId}`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBlocked(false);
    },
  });

  const handleFollow = () => {
    if (isFollow) {
      unfollow();
    } else if (isBlocked) {
      unblock();
    } else {
      follow({});
    }
  };

  const goToMessage = () => {};

  const goToMap = () => {
    navigation.push("Map", {
      profession: userDetails?.profession?._id,
      userId: userDetails?._id,
    });
  };

  const userSettings = userDetails?.user?.settings;
  const isPrivate = !isFollow && userSettings?.private;

  const profileActions = (
    <>
      <FollowProfileButton
        isFollow={isFollow}
        isBlocked={isBlocked}
        onPress={handleFollow}
      />
      {isFollow && (
        <ProfileIconButton name="message-circle" onPress={goToMessage} />
      )}
      <Protected
        roles={[MAIN_ROLE, SECOND_ROLE]}
        userRole={userDetails?.user?.role}
      >
        <ProfileIconButton name="map-pin" onPress={goToMap} />
      </Protected>
      <ProfileIconButton
        name="adduser"
        type="antdesign"
        onPress={handleSuggested}
        loading={isLoading}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <HeaderProfileGeneral
        username={username}
        checkmark={checkmark}
        hours={userDetails?.user?.hours}
        onOpenSettings={() => settingsRef.current?.present()}
      />
      <Profile
        user={userDetails?.user}
        profileActions={profileActions}
        isPrivate={isPrivate}
        isBlocked={isBlocked}
      />
      <SheetModal
        snapPoints={snapPoints}
        ref={settingsRef}
        animationConfig={{ duration: 300 }}
      >
        <View>
          <Text>Hello World</Text>
        </View>
      </SheetModal>
      {/* {suggested && (
        <SuggestedUsersList suggested={suggested?.data} userId={userId} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
