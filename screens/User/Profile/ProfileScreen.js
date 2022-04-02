import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileAvatar from "../../../components/customized/ProfileAvatar/ProfileAvatar";
import BottomSheetPopup from "../../../components/customized/BottomSheets/BottomSheetPopup";
import { useAuth } from "../../../context/auth";
import { AuthService } from "../../../services/AuthService";
import MenuItem from "../../../components/customized/MenuItem/MenuItem";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";
import SwitchAccount from "../../../components/customized/SwitchAccount/SwitchAccount";
import PostsProfileScreen from "./PostsProfileScreen";
import ProductsProfileScreen from "./ProductsProfileScreen";
import { Colors } from "../../../assets/styles/Colors";
import AboutProfileScreen from "./AboutProfileScreen";
import CalendarProfileScreen from "./CalendarProfileScreen";
import { FlatList } from "react-native-gesture-handler";
import Stack from "../../../components/core/Containers/Stack";

const ProfileScreen = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(false);
  const navigation = useNavigation();
  const { user, setUser } = useAuth();

  const closeSheet = () => {
    setOpenSwitch(false);
    setOpenSettings(false);
  };
  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderReusable
        sx={{ paddingVertical: 20 }}
        firstBox={
          <Stack direction="row">
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Icon name="adduser" type="antdesign" />
            </TouchableOpacity>
            <Icon
              size={30}
              type="ionicon"
              name="add-circle-outline"
              color="white"
            />
          </Stack>
        }
        secondBox={
          <TouchableOpacity
            onPress={() => setOpenSwitch(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontFamily: "Exo-Medium", fontSize: 15 }}>
              {user?.name}
            </Text>
            <Icon name="keyboard-arrow-down" type="material" />
          </TouchableOpacity>
        }
        thirdBox={
          <Stack direction="row">
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <Icon size={30} type="ionicon" name="add-circle-outline" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              activeOpacity={1}
              onPress={() => setOpenSettings(true)}
            >
              <Icon size={30} type="ionicon" name="menu-outline" />
            </TouchableOpacity>
          </Stack>
        }
      />
      <ProfileAvatar user={user} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let iconType;

            if (route.name === "Posts") {
              iconType = "antdesign";
              iconName = focused ? "appstore-o" : "appstore-o";
            } else if (route.name === "Products") {
              iconType = "material-community";
              iconName = focused ? "shopping-outline" : "shopping-outline";
            } else if (route.name === "Calendar") {
              iconType = "antdesign";
              iconName = focused ? "calendar" : "calendar";
            } else if (route.name === "About") {
              iconType = "antdesign";
              iconName = focused ? "user" : "user";
            }
            return <Icon name={iconName} type={iconType} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIndicatorContainerStyle: {
            color: "red",
          },
        })}
      >
        <Tab.Screen name="Posts" component={PostsProfileScreen} />
        <Tab.Screen name="Products" component={ProductsProfileScreen} />
        <Tab.Screen name="Calendar" component={CalendarProfileScreen} />
        <Tab.Screen name="About" component={AboutProfileScreen} />
      </Tab.Navigator>

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
