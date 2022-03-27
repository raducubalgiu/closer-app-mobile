import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TabsProfile from "../../components/Tabs/TabsProfile/TabsProfile";
import TabViewProfile from "../../components/Tabs/TabsProfile/TabViewProfile";
import ProfileAvatarSection from "../../components/ProfileAvatarSection.tsx/ProfileAvatarSection";
import BottomSheetGeneral from "../../components/BottomSheets/BottomSheetPopup";
import { useAuth } from "../../context/auth";
import { AuthService } from "../../services/AuthService";
import MenuItem from "../../components/MenuItem/MenuItem";
import { Icon } from "react-native-elements";

const ProfileScreen = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { user } = useAuth();

  const closeSheet = () => setOpen(false);
  const handleLogout = async () => {
    await AuthService.logout();

    setUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.header}
        onPress={() => setOpen(true)}
      >
        <Icon
          style={{ padding: 20 }}
          size={20}
          type="entypo"
          name="dots-three-vertical"
        />
      </TouchableOpacity>
      <View>
        <ProfileAvatarSection user={user} />
        <View>
          <TabsProfile index={index} onSetIndex={(e) => setIndex(e)} />
          <TabViewProfile
            index={index}
            onSetIndex={(e) => setIndex(e)}
            products={user.products}
          />
        </View>
      </View>
      <BottomSheetGeneral
        open={open}
        onClose={closeSheet}
        height={60}
        sheetBody={
          <View>
            <MenuItem
              iconName="setting"
              iconType="antdesign"
              text="Setari"
              onPress={() => {}}
            />

            <MenuItem
              iconName="bars"
              iconType="antdesign"
              text="Programarile tale"
              onPress={() => {}}
            />

            <MenuItem
              iconName="gift"
              iconType="antdesign"
              text="Discounturi"
              onPress={() => {}}
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
        }
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
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 2.5,
  },
});
