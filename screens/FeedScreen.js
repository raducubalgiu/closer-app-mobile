import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Icon, Divider } from "react-native-elements";
import moment from "moment";
import React, { useCallback, useEffect, useState, useRef } from "react";
import CardPost from "../components/customized/Cards/CardPost";
import { Colors } from "../assets/styles/Colors";
import axios from "axios";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../context/auth";
import { Stack } from "../components/core";
import FeedLabelButton from "../components/customized/Buttons/FeedLabelButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const FeedScreen = () => {
  const { postsState, dispatchPosts } = usePosts();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followingsPosts, setFollowingsPosts] = useState([]);

  const fetchAllPosts = useCallback(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const fetchFollowings = () => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_POINT}/users/${user?._id}/get-followings-posts`)
      .then((res) => {
        setFollowingsPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  return (
    <SafeAreaView style={styles.screen}>
      <Stack justify="start">
        <ScrollView
          horizontal
          style={{
            marginVertical: 7.5,
            paddingHorizontal: 12.5,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <Stack direction="row">
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Icon
                name="search"
                type="feather"
                color={Colors.textDark}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="video"
                type="feather"
                color={Colors.textDark}
                size={24}
              />
            </TouchableOpacity>
            <Divider orientation="vertical" style={{ marginHorizontal: 10 }} />
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
      <Animated.FlatList
        ListHeaderComponent={
          loading && <ActivityIndicator style={{ marginVertical: 20 }} />
        }
        contentContainerStyle={{ marginTop: 5 }}
        data={posts}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardPost
            avatar={item?.avatar}
            username={item?.user?.username}
            job={item?.user?.job}
            date={moment(item.createdAt).startOf("hour").fromNow()}
            image={item?.images[0]?.url}
            description={item?.description}
            likesCount={item?.likesCount}
            commentsCount={item?.commentsCount}
            bookable={item?.bookable}
            checkmark={item?.checkmark}
            isBookmark={false}
            postId={item?._id}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
  exploreText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
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
    color: Colors.textLight,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
    color: Colors.textDark,
    paddingLeft: 10,
    marginTop: 30,
  },
});
