import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon, Divider } from "react-native-elements";
import moment from "moment";
import React, { useCallback, useEffect, useState, useRef } from "react";
import CardPost from "../components/customized/Cards/CardPost";
import { Colors } from "../assets/styles/Colors";
import axios from "axios";
import { usePosts } from "../hooks/usePosts";
import { useScrollable } from "../hooks/useScrollable";
import { useAuth } from "../context/auth";
import { Stack } from "../components/core";
import FakeSearchBarSimple from "../components/customized/FakeSearchBar/FakeSearchBarSimple";
import FeedLabelButton from "../components/customized/Buttons/FeedLabelButton";
import BottomSheetPopup from "../components/customized/BottomSheets/BottomSheetPopup";

const FeedScreen = () => {
  const { postsState, dispatchPosts } = usePosts();
  const {
    scrollY,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    headerTranslate,
  } = useScrollable();
  const { user } = useAuth();
  const [openSheet, setOpenSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followingsPosts, setFollowingsPosts] = useState([]);

  const fetchAllPosts = useCallback(() => {
    setLoading(true);
    axios
      .get(`http://192.168.100.2:8000/api/v1/posts`)
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
      .get(
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/get-followings-posts`
      )
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

  const closeSheet = () => setOpenSheet(false);

  return (
    <>
      <View style={styles.screen}>
        <SafeAreaView style={styles.safeAreaView} />
        <View style={styles.containerList}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              transform: [{ translateY: headerTranslate }],
            }}
          >
            <Stack direction="row" sx={{ height: 50, paddingHorizontal: 15 }}>
              <FakeSearchBarSimple />
              <TouchableOpacity style={styles.bookmark}>
                <Icon
                  name="bookmark-o"
                  type="font-awesome"
                  size={25}
                  color={Colors.textDark}
                />
              </TouchableOpacity>
            </Stack>
            <View
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#f1f1f1",
                borderTopWidth: 1,
                borderTopColor: "#f1f1f1",
                marginTop: 3,
              }}
            >
              <ScrollView
                horizontal
                style={{
                  marginVertical: 7.5,
                  backgroundColor: "white",
                  paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
              >
                <Stack direction="row" sx={styles.explore}>
                  <Icon
                    name="find"
                    type="antdesign"
                    color={Colors.textDark}
                    size={20}
                  />
                  <Text style={styles.exploreText}>Exploreaza</Text>
                </Stack>
                <Divider
                  orientation="vertical"
                  style={{ marginHorizontal: 10 }}
                />
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
              </ScrollView>
            </View>
          </Animated.View>
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          ListHeaderComponent={
            loading && <ActivityIndicator style={{ marginVertical: 20 }} />
          }
          contentContainerStyle={{ marginTop: 100 }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={16}
          data={posts}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CardPost
              avatar={item.avatar}
              username={item.user.username}
              job={item.user.job}
              date={moment(item.createdAt).startOf("hour").fromNow()}
              image={item.images[0].url}
              description={item.description}
              likes={150}
              bookable={item.bookable}
              checkmark={item.checkmark}
              isLike={false}
              isBookmark={false}
              openComments={() => setOpenSheet(true)}
            />
          )}
        />
      </View>
      <BottomSheetPopup
        open={openSheet}
        onClose={closeSheet}
        height={55}
        sheetBody={openSheet && <Text>Comments</Text>}
      />
    </>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  safeAreaView: { backgroundColor: "white", zIndex: 10000 },
  containerList: { backgroundColor: "white", zIndex: 900 },
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
  explore: {
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingHorizontal: 12.5,
    backgroundColor: "#f1f1f1",
  },
  exploreText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    marginLeft: 5,
  },
});
