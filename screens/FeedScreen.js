import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Animated,
  View,
} from "react-native";
import React, { useCallback, useState, useRef } from "react";
import {
  useNavigation,
  useScrollToTop,
  useFocusEffect,
} from "@react-navigation/native";
import { Divider, Badge } from "@rneui/themed";
import theme from "../assets/styles/theme";
import axios from "axios";
import { usePosts, useAuth } from "../hooks/index";
import {
  IconButton,
  Spinner,
  Stack,
  FeedLabelButton,
} from "../components/core";
import { CardPost } from "../components/customized";
import { useTranslation } from "react-i18next";
import { dateFormat } from "../utils";

const FeedScreen = () => {
  const { postsState, dispatchPosts } = usePosts();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followingsPosts, setFollowingsPosts] = useState([]);
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const fetchAllPosts = useCallback(() => {
    if (postsState.activeAll) {
      setLoading(true);
      const unsubscribe = axios
        .get(`${process.env.BASE_ENDPOINT}/posts`)
        .then((res) => {
          setPosts(res.data.posts);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      return () => unsubscribe();
    }
  }, [postsState.activeAll]);

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPosts();
    }, [fetchAllPosts])
  );

  const fetchFollowings = useCallback(() => {
    if (postsState.activeFollowings) {
      setLoading(true);
      const unsubscribe = axios
        .get(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/get-followings-posts`
        )
        .then((res) => {
          setFollowingsPosts(res.data.posts);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      return () => unsubscribe();
    }
  }, [postsState.activeFollowings]);

  useFocusEffect(
    React.useCallback(() => {
      fetchFollowings();
    }, [fetchFollowings])
  );

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    wait(1000).then(() => {
      setLoading(false);
      fetchAllPosts();
    });
  }, []);

  const renderAllPosts = ({ item }) => {
    const { user } = item;

    return (
      <CardPost
        postId={item?._id}
        userId={user?._id}
        avatar={user?.avatar}
        username={user?.username}
        job={user?.business?.name}
        date={dateFormat(item?.createdAt)}
        image={item?.images[0]?.url}
        description={item?.description}
        likesCount={item?.likesCount}
        commentsCount={item?.commentsCount}
        bookable={item?.bookable}
        checkmark={user?.checkmark}
      />
    );
  };

  const renderFollowingPosts = ({ item }) => {
    const { post, user } = item;

    return (
      <CardPost
        postId={post?._id}
        userId={user?._id}
        avatar={user?.avatar}
        username={user?.username}
        job={user?.business?.name}
        date={dateFormat(post?.createdAt)}
        image={item?.images[0]?.url}
        description={post?.description}
        likesCount={post?.likesCount}
        commentsCount={post?.commentsCount}
        bookable={post?.bookable}
        checkmark={post?.checkmark}
      />
    );
  };

  const refreshControl = (
    <RefreshControl loading={loading} onRefresh={onRefresh} />
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
                fetchAllPosts();
              }}
              isActive={postsState.activeAll}
              text={t("explore")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_FOLLOWINGS" });
                fetchFollowings();
              }}
              isActive={postsState.activeFollowings}
              text={t("following")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_LAST_MINUTE" });
              }}
              isActive={postsState.activeLastMinute}
              text={t("lastMinute")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_JOBS" });
              }}
              isActive={postsState.activeJobs}
              text={t("jobs")}
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_VIDEO" });
              }}
              isActive={postsState.activeVideo}
              text={t("videoContent")}
            />
          </Stack>
        </ScrollView>
      </Stack>
      <Divider color="#ddd" />
      <Animated.FlatList
        ref={ref}
        ListHeaderComponent={loading && <Spinner sx={styles.spinner} />}
        refreshControl={refreshControl}
        contentContainerStyle={{ marginTop: 5 }}
        data={postsState.activeAll ? posts : followingsPosts}
        nestedScrollEnabled={true}
        keyExtractor={
          postsState.activeAll ? (item) => item._id : (item) => item.post._id
        }
        showsVerticalScrollIndicator={false}
        renderItem={
          postsState.activeAll ? renderAllPosts : renderFollowingPosts
        }
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
