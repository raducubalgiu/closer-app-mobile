import { SafeAreaView, StyleSheet } from "react-native";
import { useCallback } from "react";
import {
  SavedHashtagsTab,
  TopTabContainer,
  SavedProductsTab,
  SavedPostsTab,
} from "../../../components/customized/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../../../components/core";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks";
import { useTranslation } from "react-i18next";

const BookmarksScreen = () => {
  const { user } = useAuth();
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const SavedPosts = useCallback(() => <SavedPostsTab user={user} />, []);
  const SavedProducts = useCallback(() => <SavedProductsTab user={user} />, []);
  const SavedHashtags = useCallback(() => <SavedHashtagsTab user={user} />, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("saved")} />
      <TopTabContainer initialRouteName="SavedAll">
        <Tab.Screen
          name="SavedPosts"
          component={SavedPosts}
          options={{ tabBarLabel: t("posts") }}
        />
        <Tab.Screen
          name="SavedProducts"
          component={SavedProducts}
          options={{ tabBarLabel: t("products") }}
        />
        <Tab.Screen
          name="SavedHashtags"
          component={SavedHashtags}
          options={{ tabBarLabel: t("hashtags") }}
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
