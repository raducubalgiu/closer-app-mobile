import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Divider, Badge } from "@rneui/themed";
import theme from "../assets/styles/theme";
import { usePosts, useHttpGet } from "../hooks/index";
import { IconButton, Stack, FeedLabelButton } from "../components/core";
import { CardPost } from "../components/customized";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

const FeedScreen = () => {
  const { postsState, dispatchPosts } = usePosts();
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const { data: posts } = useHttpGet("/posts/get-all-posts");

  const renderAllPosts = useCallback(({ item }) => {
    return <CardPost post={item} />;
  }, []);
  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Stack justify="start">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Stack direction="row" sx={styles.listHoriz}>
            <IconButton
              iconName="search"
              iconType="feather"
              sx={{ marginRight: 24 }}
              onPress={() => navigation.navigate("SearchPosts")}
            />
            <View>
              <IconButton
                iconName="bell"
                iconType="feather"
                onPress={() => navigation.navigate("Notifications")}
              />
              <Badge
                badgeStyle={{
                  backgroundColor: "#F72A50",
                }}
                containerStyle={styles.badgeContainer}
              />
            </View>
            <Divider orientation="vertical" style={{ marginHorizontal: 15 }} />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_ALL" });
                fetchAllPosts();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              isActive={postsState.activeAll}
              text={t("explore")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_FOLLOWINGS" });
                fetchFollowings();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              isActive={postsState.activeFollowings}
              text={t("following")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_LAST_MINUTE" });
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              isActive={postsState.activeLastMinute}
              text={t("lastMinute")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_JOBS" });
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              isActive={postsState.activeJobs}
              text={t("jobs")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_VIDEO" });
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              isActive={postsState.activeVideo}
              text={t("videoContent")}
            />
          </Stack>
        </ScrollView>
      </Stack>
      <Divider color="#ddd" />
      <FlatList
        ref={ref}
        data={posts}
        removeClippedSubviews={true}
        nestedScrollEnabled={true}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        renderItem={renderAllPosts}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
  exploreText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    marginLeft: 5,
  },
  contentContainerStyle: { marginTop: 50 },
  welcome: {
    fontFamily: "Exo-SemiBold",
    fontSize: 21,
    marginBottom: 2.5,
  },
  bookmark: { padding: 5, marginLeft: 10 },
  description: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
    color: theme.lightColors.black,
    paddingLeft: 10,
    marginTop: 30,
  },
  spinner: { paddingVertical: 10 },
  listHoriz: {
    marginVertical: 7.5,
    paddingHorizontal: 12.5,
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
  },
});
