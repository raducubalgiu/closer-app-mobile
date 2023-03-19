import { StyleSheet, View, Text } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
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
import ConfirmModal from "../../../components/customized/Modals/ConfirmModal";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Button, Protected, SheetModal, Stack } from "../../../components/core";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import Profile from "../../../components/customized/Profile/Profile";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ProfileSettingsSheet from "../../../components/customized/Sheets/ProfileSettingsSheet";
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
  const snapPoints = useMemo(() => [1, 250], []);
  const settingsRef = useRef<BottomSheetModal>(null);
  const blockRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();

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
    onSuccess: () => setIsBlocked(true),
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

  const handleBlock = () => {
    block({});
    isFollow && unfollow();
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
        animationConfig={{ duration: 150 }}
      >
        <ProfileSettingsSheet
          onHandleBlock={() => {
            settingsRef.current?.close();
            blockRef.current?.present();
          }}
        />
      </SheetModal>
      <SheetModal
        snapPoints={snapPoints}
        ref={blockRef}
        animationConfig={{ duration: 150 }}
      >
        <View
          style={{
            margin: 20,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 10 }}>
              Blochezi pe @raducubalgiu?
            </Text>
            <Text style={{ color: "gray" }}>
              Acesta nu iti va mai putea trimite mesaje si nu va veti mai vedea
              fotografiile si videoclipurile postate
            </Text>
          </View>
          <Button title={t("block")} onPress={handleBlock} />
        </View>
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
