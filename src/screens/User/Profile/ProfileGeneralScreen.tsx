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
  useRefreshOnFocus,
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const snapPoints = useMemo(() => [1, 250], []);
  const settingsRef = useRef<BottomSheetModal>(null);
  const blockRef = useRef<BottomSheetModal>(null);
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
  const { address } = locationId || {};

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
    },
  });

  const { mutate: unblock } = useDelete({
    uri: `/users/${user?.id}/blocks/${id}`,
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
      profession: profession?.id,
      userId: id,
      initialCoordinates: address?.coordinates,
    });
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
        <ProfileIconButton name="message-circle" onPress={goToMessage} />
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
      <SheetModal
        snapPoints={snapPoints}
        ref={settingsRef}
        animationConfig={{ duration: 150 }}
      >
        <ProfileSettingsSheet
          onHandleBlock={onHandleBlock}
          onReport={() => {
            settingsRef.current?.close();
            navigation.navigate("ReportUser");
          }}
          isBlocked={isBlocked}
        />
      </SheetModal>
      <SheetModal
        snapPoints={snapPoints}
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
