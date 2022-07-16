import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  Text,
} from "react-native";
import { Header, IconBackButton, Stack } from "../components/core";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../hooks";
import { CardPost } from "../components/customized";

const { width, height } = Dimensions.get("window");

const PostScreen = ({ route }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const { userId, postId } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-posts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setPosts(res.data.posts);
        })
        .catch((err) => console.log(err));
    }, [userId, user])
  );

  const renderUserPosts = ({ item }) => <CardPost post={item} />;
  const getItemLayout = (data, index) => ({
    length: width,
    offset: height * index,
    index,
  });

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title="Postări" divider />
      </SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialScrollIndex={3}
        getItemLayout={getItemLayout}
        data={posts}
        keyExtractor={(item) => item?._id}
        renderItem={renderUserPosts}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 500,
  },
});
