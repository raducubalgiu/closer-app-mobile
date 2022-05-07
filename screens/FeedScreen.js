import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import moment from "moment";
import React, { useCallback, useEffect, useState, useRef } from "react";
import CardPost from "../components/customized/Cards/CardPost";
import theme from "../assets/styles/theme";
import axios from "axios";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../context/auth";
import { IconButton, Stack } from "../components/core";
import FeedLabelButton from "../components/core/Buttons/FeedLabelButton";

const FeedScreen = () => {
  const { postsState, dispatchPosts } = usePosts();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followingsPosts, setFollowingsPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef(null);
  useScrollToTop(ref);

  const fetchAllPosts = useCallback(() => {
    console.log("FETCH POSTS");
    setLoading(true);
    const unsubscribe = axios
      .get(`${process.env.BASE_ENDPOINT}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const fetchFollowings = useCallback(() => {
    console.log("FETCH_FOLLOWINGS_POSTS!");
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
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const renderAllPosts = ({ item }) => {
    const { user } = item;

    return (
      <CardPost
        postId={item?._id}
        userId={user?._id}
        avatar={user?.avatar[0]?.url}
        username={user?.username}
        job={user?.business?.name}
        date={moment(item?.createdAt).startOf("hour").fromNow()}
        image={item?.images[0]?.url}
        description={item?.description}
        likesCount={item?.likesCount}
        commentsCount={item?.commentsCount}
        bookable={item?.bookable}
        checkmark={item?.checkmark}
        isBookmark={false}
      />
    );
  };

  const renderFollowingPosts = ({ item }) => {
    const { post, user } = item;

    return (
      <CardPost
        postId={post?._id}
        userId={user?._id}
        avatar={user?.avatar[0]?.url}
        username={user?.username}
        job={user?.business?.name}
        date={moment(post?.createdAt).startOf("hour").fromNow()}
        image={post?.images[0]?.url}
        description={post?.description}
        likesCount={post?.likesCount}
        commentsCount={post?.commentsCount}
        bookable={post?.bookable}
        checkmark={post?.checkmark}
        isBookmark={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack justify="start">
        <ScrollView
          horizontal
          style={styles.listHoriz}
          showsHorizontalScrollIndicator={false}
        >
          <Stack direction="row">
            <IconButton
              iconName="search"
              iconType="feather"
              sx={{ marginRight: 24 }}
            />
            <IconButton iconName="bell" iconType="feather" />
            <Divider orientation="vertical" style={{ marginHorizontal: 15 }} />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_ALL" });
                fetchAllPosts();
              }}
              isActive={postsState.activeAll}
              text="Toate"
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_FOLLOWINGS" });
                fetchFollowings();
              }}
              isActive={postsState.activeFollowings}
              text="Urmaresti"
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_LAST_MINUTE" });
              }}
              isActive={postsState.activeLastMinute}
              text="Oferte Last Minute"
            />
          </Stack>
        </ScrollView>
      </Stack>
      <Divider color="#ddd" />
      <Animated.FlatList
        ref={ref}
        ListHeaderComponent={
          loading && <ActivityIndicator style={styles.spinner} />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  spinner: { marginVertical: 20 },
  listHoriz: {
    marginVertical: 7.5,
    paddingHorizontal: 12.5,
  },
});
