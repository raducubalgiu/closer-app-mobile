import { StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { Header } from "../components/core";
import { CardHashtagOverview, TopTabContainer } from "../components/customized";
import { useGet } from "../hooks";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  HashtagPostsPopularTab,
  HashtagPostsRecentTab,
  HashtagPostsBookableTab,
} from "../components/customized";

const HashtagScreen = ({ route }) => {
  const { name } = route.params;
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();

  const { data, isLoading: loadHashtag } = useGet({ uri: `/hashtags/${name}` });

  const HashtagPostsBookable = useCallback(
    () => <HashtagPostsBookableTab name={name} />,
    [name]
  );
  const HashtagPostsPopular = useCallback(
    () => <HashtagPostsPopularTab name={name} />,
    [name]
  );
  const HashtagPostsRecent = useCallback(
    () => <HashtagPostsRecentTab name={name} />,
    [name]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={`#${name}`} />
      {!loadHashtag && (
        <CardHashtagOverview
          bookmarkId={data?._id}
          postsCount={data?.postsCount}
          bookmarksCount={data?.bookmarksCount}
        />
      )}
      <TopTabContainer initialRouteName="HashtagPostsPopular">
        <Tab.Screen
          name="HashtagPostsPopular"
          component={HashtagPostsPopular}
          options={{ tabBarLabel: t("populars") }}
        />
        <Tab.Screen
          name="HashtagPostsBookable"
          component={HashtagPostsBookable}
          options={{ tabBarLabel: t("bookable") }}
        />
        <Tab.Screen
          name="HashtagPostsRecent"
          component={HashtagPostsRecent}
          options={{ tabBarLabel: t("recent") }}
        />
      </TopTabContainer>
    </SafeAreaView>
  );
};

export default HashtagScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
});
