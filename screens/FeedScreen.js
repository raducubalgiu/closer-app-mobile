import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import axios from "axios";
import { Divider, Badge } from "@rneui/themed";
import theme from "../assets/styles/theme";
import { usePosts, useSheet, useAuth } from "../hooks/index";
import {
  IconButton,
  Stack,
  FeedLabelButton,
  Spinner,
} from "../components/core";
import { CardPost, PostInfoSheet } from "../components/customized";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { ConfirmModal } from "../components/customized/Modals/ConfirmModal";

const FeedScreen = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { postsState, dispatchPosts } = usePosts();
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const fetchAllPosts = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get(
        `${process.env.BASE_ENDPOINT}/posts/get-all-posts?page=${page}&limit=20`,
        {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [user, page]);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const fetchFollowings = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user._id}/posts/get-followings-posts?page${page}&limit=20`,
        {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [user]);

  const showConfirm = useCallback(() => {
    CLOSE_BS();
    setVisible(true);
  }, []);
  const updatePosts = useCallback(
    () => setPosts((posts) => posts.filter((p) => p._id !== postId)),
    [postId]
  );

  const sheetContent = (
    <PostInfoSheet
      postId={postId}
      onCloseBS={() => CLOSE_BS()}
      onShowConfirm={showConfirm}
      onUpdatePosts={updatePosts}
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

  const handleDelete = useCallback(() => {
    CLOSE_BS();
    setLoading(true);

    axios
      .delete(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${postId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then(() => {
        setPosts((posts) => posts.filter((p) => p._id !== postId));
        setVisible(false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, postId]);

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
          </Stack>
        </ScrollView>
      </Stack>
      <Divider color="#ddd" />
      <FlatList
        ref={ref}
        data={posts}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        nestedScrollEnabled={true}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        renderItem={renderAllPosts}
        ListFooterComponent={loading && <Spinner sx={{ marginVertical: 5 }} />}
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
