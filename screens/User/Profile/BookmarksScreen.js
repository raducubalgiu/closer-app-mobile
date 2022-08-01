import { SafeAreaView, StyleSheet } from "react-native";
import { useCallback } from "react";
import {
  AllSavedTab,
  SavedVideoTab,
  SavedHashtagsTab,
  TopTabContainer,
} from "../../../components/customized/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../../../components/core";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks";

const BookmarksScreen = () => {
  const { user } = useAuth();
  const Tab = createMaterialTopTabNavigator();

  const AllSaved = useCallback(() => <AllSavedTab user={user} />, [user]);
  const SavedHashtags = useCallback(
    () => <SavedHashtagsTab user={user} />,
    [user]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Salvate" />
      <TopTabContainer initialRouteName="SavedAll">
        <Tab.Screen
          name="SavedAll"
          component={AllSaved}
          options={{ tabBarLabel: "Toate" }}
        />
        <Tab.Screen
          name="SavedVideo"
          component={SavedVideoTab}
          options={{ tabBarLabel: "Video" }}
        />
        <Tab.Screen
          name="Hashtags"
          component={SavedHashtags}
          options={{ tabBarLabel: "Hashtaguri" }}
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
