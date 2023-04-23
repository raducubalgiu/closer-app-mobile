import { StyleSheet, View } from "react-native";
import { useRef, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import Profile from "../../../components/customized/Profile/Profile";
import { useAuth } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { Button, SheetModal } from "../../../components/core";
import {
  ProfileMenuSheet,
  PostOptionsSheet,
  ProfileIconButton,
  HeaderProfile,
} from "../../../components/customized";

const ProfileScreen = () => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");
  const settingsRef = useRef<BottomSheetModal>(null);
  const addPostRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 200], []);

  const profileActions = (
    <>
      <Button
        title={t("editProfile")}
        onPress={() => navigation.navigate("EditProfile")}
        variant="outlined"
        sxBtn={{ width: 150 }}
      />
      <ProfileIconButton
        name="bookmark"
        onPress={() => navigation.navigate("Bookmarks", { user })}
      />
    </>
  );

  return (
    <View style={styles.screen}>
      <HeaderProfile
        username={user?.username}
        checkmark={user?.checkmark}
        onGoToFindFriends={() => {}}
        onOpenSettings={() => settingsRef.current?.present()}
        onOpenPostOptions={() => addPostRef.current?.present()}
      />
      <Profile user={user} profileActions={profileActions} />
      <SheetModal
        ref={settingsRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <ProfileMenuSheet onCloseSheet={() => settingsRef.current?.close()} />
      </SheetModal>
      <SheetModal
        ref={addPostRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <PostOptionsSheet
          onNavigateToAddImage={() => {
            addPostRef.current?.close();
            navigation.navigate("AddPhotos");
          }}
          onNavigateToAddVideo={() => {}}
        />
      </SheetModal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
