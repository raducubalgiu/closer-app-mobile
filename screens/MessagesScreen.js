import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationsTab from "../components/customized/Tabs/NotificationsTabs/NotificationsTab";
import MessagesTab from "../components/customized/Tabs/NotificationsTabs/MessagesTab";
import { Colors } from "../assets/styles/Colors";

const MessagesScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.screen}>
      {/* <HeaderSimple /> */}
      <Tab.Navigator
        initialRouteName="Notifications"
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: "Exo-SemiBold",
            textTransform: "capitalize",
            fontSize: 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.textDark,
          },
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="NotificationsTab"
          component={NotificationsTab}
          options={{ tabBarLabel: "Notificari" }}
        />
        <Tab.Screen
          name="MessagesTab"
          component={MessagesTab}
          options={{ tabBarLabel: "Mesaje primite" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
