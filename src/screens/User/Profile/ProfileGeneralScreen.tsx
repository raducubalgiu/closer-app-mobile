import { StyleSheet, View } from "react-native";
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
import ProfileSettingsSheet from "../../../components/customized/Sheets/ProfileSettingsSheet";
import BlockUserSheet from "../../../components/customized/Sheets/BlockUserSheet";
import { showToast } from "../../../utils";
import { useTranslation } from "react-i18next";

type IProps = NativeStackScreenProps<RootStackParams, "ProfileGeneral">;

export const ProfileGeneralScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, checkmark } = route.params;
  const { service, option } = route.params;
  const [isFollow, setIsFollow] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const snapPointsSettings = useMemo(() => [1, 250], []);
  const snapPointsBlock = useMemo(() => [1, 250], []);
  const settingsRef = useRef<BottomSheetModal>(null);
  const blockRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation("common");

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

  const { mutate: block } = usePost({
    uri: `/users/${user?.id}/blocks/${userId}`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBlocked(true);
      showToast({ message: t("blocked") });
    },
  });

  const { mutate: unblock } = useDelete({
    uri: `/users/${user?.id}/blocks/${userId}`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBlocked(false);
      showToast({ message: t("unblocked") });
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

  const onHandleBlock = () => {
    settingsRef.current?.close();
    blockRef.current?.present();
  };

  const handleBlock = () => {
    if (!isBlocked) {
      block({});
      isFollow && unfollow();
    } else {
      unblock();
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
        snapPoints={snapPointsSettings}
        ref={settingsRef}
        animationConfig={{ duration: 150 }}
      >
        <ProfileSettingsSheet
          onHandleBlock={onHandleBlock}
          isBlocked={isBlocked}
        />
      </SheetModal>
      <SheetModal
        snapPoints={snapPointsBlock}
        ref={blockRef}
        animationConfig={{ duration: 150 }}
      >
        <BlockUserSheet
          username={username}
          onBlock={handleBlock}
          isBlocked={isBlocked}
        />
      </SheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
