import { SafeAreaView, StyleSheet, View } from "react-native";
import { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import {
  SavedHashtagsTab,
  TopTabContainer,
  SavedProductsTab,
  SavedPostsTab,
  SavedServicesTab,
  SavedVideoTab,
} from "../../../components/customized/index";
import { Header } from "../../../components/core";
import theme from "../../../../assets/styles/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Bookmarks">;

export const BookmarksScreen = ({ route }: IProps) => {
  const { user } = route.params;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation("common");

  const SavedPosts = useCallback(() => <SavedPostsTab user={user} />, []);
  const SavedServices = useCallback(() => <SavedServicesTab user={user} />, []);
  const SavedProducts = useCallback(() => <SavedProductsTab user={user} />, []);
  const SavedHashtags = useCallback(() => <SavedHashtagsTab user={user} />, []);
  const SavedVideo = useCallback(() => <SavedVideoTab user={user} />, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("saved")} />
      </SafeAreaView>
      <TopTabContainer
        initialRouteName="SavedAll"
        tabBarScrollEnabled={true}
        options={{ tabBarItemStyle: { width: 90 } }}
      >
        <Tab.Screen
          name="SavedPosts"
          component={SavedPosts}
          options={{ tabBarLabel: t("posts") }}
        />
        <Tab.Screen
          name="SavedVideo"
          component={SavedVideo}
          options={{ tabBarLabel: t("video") }}
        />
        <Tab.Screen
          name="SavedServices"
          component={SavedServices}
          options={{ tabBarLabel: t("services") }}
        />
        <Tab.Screen
          name="SavedProducts"
          component={SavedProducts}
          options={{ tabBarLabel: t("products") }}
        />
        <Tab.Screen
          name="SavedHashtags"
          component={SavedHashtags}
          options={{ tabBarLabel: t("hashtag") }}
        />
      </TopTabContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 16,
    color: black,
  },
  labelStyle: {
    textTransform: "capitalize",
    fontSize: 14,
  },
  indicatorStyle: {
    backgroundColor: black,
  },
});
