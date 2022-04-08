import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BottomSheetPopup from "../../../components/customized/BottomSheets/BottomSheetPopup";
import { AuthService } from "../../../services/AuthService";
import MenuItem from "../../../components/customized/MenuItem/MenuItem";
import { useNavigation } from "@react-navigation/native";
import SwitchAccount from "../../../components/customized/SwitchAccount/SwitchAccount";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import OutlinedButton from "../../../components/core/Buttons/OutlinedButton";
import HeaderProfile from "../../../components/customized/Headers/HeaderProfile";
import { useAuth } from "../../../context/auth";
import TopTabNavigator from "../../TopTabNavigator";

const ProfileScreen = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(null);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useAuth();

  const fetchUser = useCallback(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${user?._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((resp) => {
        setUserDetails(resp.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${user?._id}/get-order`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setCompletedSteps(res.data.order))
      .catch((err) => console.log(err));
  }, []);

  const closeSheet = () => {
    setOpenSwitch(false);
    setOpenSettings(false);
  };
  const handleLogout = async () => {
    const { error } = await AuthService.logout();
    if (!error) setUser(null);
  };

  const buttons = (
    <OutlinedButton
      title="Editeaza profilul"
      onPress={() => navigation.navigate("EditProfile")}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        onOpenSwitch={() => setOpenSwitch(true)}
        name={userDetails?.name}
        onOpenSettings={() => setOpenSettings(true)}
      />
      <ProfileOverview
        user={userDetails}
        withBadge={true}
        actionButtons={buttons}
      />
      <TopTabNavigator />

      <BottomSheetPopup
        open={openSettings}
        onClose={closeSheet}
        height={60}
        sheetBody={
          openSettings && (
            <View>
              <MenuItem
                iconName="setting"
                iconType="antdesign"
                text="Setari"
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              />

              <MenuItem
                iconName="bars"
                iconType="antdesign"
                text="Programarile tale"
                onPress={() => navigation.navigate("Schedules")}
              />

              <MenuItem
                iconName="gift"
                iconType="antdesign"
                text="Discounturi"
                onPress={() => navigation.navigate("Discounts")}
              />

              <MenuItem
                iconName="exclamationcircleo"
                iconType="antdesign"
                text="Raporteaza o problema"
                onPress={() => {}}
              />

              <MenuItem
                iconName="logout"
                iconType="antdesign"
                text="Delogare"
                onPress={handleLogout}
              />
            </View>
          )
        }
      />
      <BottomSheetPopup
        open={openSwitch}
        onClose={closeSheet}
        height={40}
        sheetBody={openSwitch && <SwitchAccount />}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
