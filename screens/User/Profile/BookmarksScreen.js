import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import {
  AllSavedTab,
  SavedVideoTab,
  OpportunitiesTab,
  TopTabContainer,
} from "../../../components/customized/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../../../components/core";
import theme from "../../../assets/styles/theme";

const BookmarksScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Salvate" />
      <TopTabContainer initialRouteName="SavedAll">
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
      </TopTabContainer>
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
    color: theme.lightColors.black,
  },
  labelStyle: {
    fontFamily: "Exo-SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
  },
  indicatorStyle: {
    backgroundColor: theme.lightColors.black,
  },
});
