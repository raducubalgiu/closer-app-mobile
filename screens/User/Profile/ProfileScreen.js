import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomSheetPopup from "../../../components/customized/BottomSheets/BottomSheetPopup";
import { AuthService } from "../../../services/AuthService";
import { useNavigation } from "@react-navigation/native";
import SwitchAccount from "../../../components/customized/SwitchAccount/SwitchAccount";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import OutlinedButton from "../../../components/core/Buttons/OutlinedButton";
import HeaderProfile from "../../../components/customized/Headers/HeaderProfile";
import { useAuth } from "../../../context/auth";
import TopTabNavigator from "../../TopTabNavigator";
import { Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";
import SettingsList from "../../../components/customized/Lists/SettingsList";

const ProfileScreen = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [openSettings, setOpenSettings] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${user?._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((resp) => {
        setUserDetails(resp.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  const closeSheet = () => {
    setOpenSwitch(false);
    setOpenSettings(false);
  };
  const handleLogout = async () => {
    const { error } = await AuthService.logout();
    if (!error) setUser(null);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${user?._id}/get-posts`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err));
  }, []);

  const buttons = (
    <>
      <OutlinedButton
        title="Editeaza profilul"
        onPress={() => navigation.navigate("EditProfile")}
        sx={styles.editBtn}
      />
      <TouchableOpacity
        style={styles.savedBtn}
        onPress={() => navigation.navigate("Saved")}
      >
        <Icon
          name="bookmark"
          type="feather"
          size={20}
          color={Colors.textDark}
        />
      </TouchableOpacity>
      <Icon
        name="instagram"
        type="feather"
        size={20}
        style={styles.socialBtn}
        color={Colors.textDark}
      />
      <Icon
        name="youtube"
        type="feather"
        size={20}
        style={styles.socialBtn}
        color={Colors.textDark}
      />
    </>
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
        badgeDetails={props.badgeDetails}
        actionButtons={buttons}
      />
      <TopTabNavigator
        posts={posts}
        products={userDetails?.products}
        biography={userDetails?.description}
        website={userDetails?.website}
        address={userDetails?.location[0]?.startLocation?.address}
      />

      <BottomSheetPopup
        open={openSettings}
        onClose={closeSheet}
        height={60}
        sheetBody={
          openSettings && <SettingsList onHandleLogout={handleLogout} />
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
  editBtn: {
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 0,
  },
  savedBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 5,
  },
  socialBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 5,
  },
});
