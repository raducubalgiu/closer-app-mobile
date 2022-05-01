import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import {
  AllSavedTab,
  SavedVideoTab,
  OpportunitiesTab,
} from "../../../components/customized/Tabs/SavedTabs";
import { Colors } from "../../../assets/styles/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../../../components/core";

const BookmarksScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Salvate" />
      <Tab.Navigator
        initialRouteName="SavedAll"
        screenOptions={{
          tabBarLabelStyle: styles.labelStyle,
          tabBarIndicatorStyle: styles.indicatorStyle,
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="SavedAll"
          component={AllSavedTab}
          options={{ tabBarLabel: "Toate" }}
        />
        <Tab.Screen
          name="SavedVideo"
          component={SavedVideoTab}
          options={{ tabBarLabel: "Video" }}
        />
        <Tab.Screen
          name="Opportunities"
          component={OpportunitiesTab}
          options={{ tabBarLabel: "Oportunitati" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitle: {
    fontFamily: "Exo-Bold",
    fontSize: 16,
    color: Colors.textDark,
  },
  labelStyle: {
    fontFamily: "Exo-SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
  },
  indicatorStyle: {
    backgroundColor: Colors.textDark,
  },
});
