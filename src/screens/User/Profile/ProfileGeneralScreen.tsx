import { StyleSheet, View } from "react-native";
import { useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import {
  useAuth,
  useGet,
  useGetMutate,
  usePost,
  useDelete,
  useRefreshOnFocus,
} from "../../../hooks";
import { Protected, SheetModal } from "../../../components/core";
import {
  HeaderProfileGeneral,
  ProfileIconButton,
  FollowProfileButton,
  ConfirmModal,
} from "../../../components/customized";
import { RootStackParams } from "../../../navigation/rootStackParams";
import Profile from "../../../components/customized/Profile/Profile";
import ProfileSettingsSheet from "../../../components/customized/Sheets/ProfileSettingsSheet";
import { showToast } from "../../../utils";
import { User } from "../../../ts";

type IProps = NativeStackScreenProps<RootStackParams, "ProfileGeneral">;
type UserListItem = {
  id: string;
  user: User;
  isFollow: boolean;
  isBlocked: boolean;
};

export const ProfileGeneralScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { username, service, option } = route.params;
  const [isFollow, setIsFollow] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const snapPoints = useMemo(() => [1, 250], []);
  const settingsRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation("common");

  const { data: userDetails, refetch } = useGet<UserListItem>({
    model: "fetchUser",
    uri: `/users/${user?.id}/user/${username}`,
    options: {
      onSuccess(response) {
        if (response.data) {
          setIsFollow(response.data?.isFollow);
          setIsBlocked(response.data?.isBlocked);
        }
      },
    },
  });

  const {
    id,
    profession,
    locationId,
    settings,
    role,
    checkmark,
    hours,
    avatar,
  } = userDetails?.user || {};

  useRefreshOnFocus(refetch);

  const {
    data: suggested,
    mutate: handleSuggested,
    isLoading,
  } = useGetMutate({ uri: `/users/suggested` });

  const { mutate: follow } = usePost({
    uri: `/users/${user?.id}/followings/${id}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(true);
      handleSuggested();
    },
  });

  const { mutate: unfollow } = useDelete({
    uri: `/users/${user?.id}/followings/${id}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(false);
    },
  });

  const { mutate: block } = usePost({
    uri: `/users/${user?.id}/blocks/${id}`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBlocked(true);
      showToast({ message: t("blocked") });
      setModalVisible(false);
    },
  });

  const { mutate: unblock } = useDelete({
    uri: `/users/${user?.id}/blocks/${id}`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBlocked(false);
      showToast({ message: t("unblocked") });
      setModalVisible(false);
    },
  });

  const { mutate: goToMessages, isLoading: isLoadingChat } = usePost({
    uri: `/users/${user?.id}/chats`,
    onSuccess: (response) => {
      navigation.navigate("Messages", { chat: response.data });
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

  const handleBlock = () => {
    if (!isBlocked) {
      block({});
      isFollow && unfollow();
    } else {
      unblock();
    }
  };

  const goToMap = () => {
    // navigation.push("Map", {
    //   profession: profession?.id,
    //   userId: id,
    //   initialCoordinates: address?.coordinates,
    // });
  };

  const userSettings = settings;
  const isPrivate = !isFollow && userSettings?.private;

  const profileActions = (
    <>
      <FollowProfileButton
        isFollow={isFollow}
        isBlocked={isBlocked}
        onPress={handleFollow}
      />
      {isFollow && (
        <ProfileIconButton
          name="message-circle"
          loading={isLoadingChat}
          onPress={() => goToMessages({ users: [id] })}
        />
      )}
      <Protected roles={[MAIN_ROLE, SECOND_ROLE]} userRole={role}>
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
        hours={hours}
        onOpenSettings={() => settingsRef.current?.present()}
      />
      <Profile
        user={userDetails?.user}
        profileActions={profileActions}
        isPrivate={isPrivate}
        isBlocked={isBlocked}
      />
      <SheetModal snapPoints={snapPoints} ref={settingsRef}>
        <ProfileSettingsSheet
          onHandleBlock={() => {
            settingsRef.current?.close();
            setModalVisible(true);
          }}
          onReport={() => {
            settingsRef.current?.close();
            navigation.navigate("ReportUser");
          }}
          isBlocked={isBlocked}
        />
      </SheetModal>
      <ConfirmModal
        visible={modalVisible}
        title={
          !isBlocked
            ? t("doYouBlock", { username })
            : t("doYouUnblock", { username })
        }
        description={
          !isBlocked ? t("blockDescription") : t("unblockDescription")
        }
        action={isBlocked ? t("unblock") : t("block")}
        onAction={handleBlock}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
