import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Divider, Badge } from "@rneui/themed";
import theme from "../assets/styles/theme";
import {
  usePosts,
  useSheet,
  useAuth,
  useGetPaginate,
  useRefreshByUser,
  useDelete,
} from "../hooks";
import {
  IconButton,
  Stack,
  FeedLabelButton,
  Spinner,
} from "../components/core";
import { PostInfoSheet } from "../components/customized";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { ConfirmModal } from "../components/customized/Modals/ConfirmModal";
import CardPost from "../components/customized/Cards/CardPost/CardPost";

const { grey0, black } = theme.lightColors;

export const FeedScreen = () => {
  const { user } = useAuth();
  const [postId, setPostId] = useState(null);
  const [visible, setVisible] = useState(false);
  const { postsState, dispatchPosts } = usePosts();
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetPaginate({
      model: "allPosts",
      uri: `/posts/get-all-posts`,
      limit: "10",
    });

  const { pages } = data || {};
  const allPosts = pages?.map((page) => page.results).flat();

  const showConfirm = useCallback(() => {
    CLOSE_BS();
    setVisible(true);
  }, []);

  const sheetContent = (
    <PostInfoSheet
      postId={postId}
      onCloseBS={() => CLOSE_BS()}
      onShowConfirm={showConfirm}
      onUpdatePosts={null}
    />
  );
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    ["10%", "30%"],
    sheetContent
  );
  const showDetails = useCallback((item) => {
    setPostId(item._id);
    SHOW_BS();
  }, []);

  const renderAllPosts = useCallback(({ item }) => {
    return <CardPost post={item} onShowDetails={() => showDetails(item)} />;
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const { mutate: handleDelete } = useDelete({
    uri: `/users/${user?._id}/posts/${postId}`,
    onSuccess: () => {
      CLOSE_BS();
      setVisible(false);
    },
  });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

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
                setPosts([]);
                fetchAllPosts();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              isActive={postsState.activeAll}
              text={t("explore")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_FOLLOWINGS" });
                setPosts([]);
                //fetchFollowings();
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
              text={t("lastMinuteOffers")}
            />
          </Stack>
        </ScrollView>
      </Stack>
      <Divider color="#ddd" />
      <FlashList
        ref={ref}
        refreshControl={refreshControl}
        data={allPosts}
        renderItem={renderAllPosts}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={636}
      />
      {BOTTOM_SHEET}
      <ConfirmModal
        title={t("deletePost")}
        description={t("areYouSureDeletePost")}
        visible={visible}
        onDelete={handleDelete}
        onCloseModal={() => setVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
  exploreText: {
    color: black,
    marginLeft: 5,
  },
  contentContainerStyle: { marginTop: 50 },
  welcome: {
    fontSize: 21,
    marginBottom: 2.5,
  },
  bookmark: { padding: 5, marginLeft: 10 },
  description: {
    color: grey0,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    color: black,
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
