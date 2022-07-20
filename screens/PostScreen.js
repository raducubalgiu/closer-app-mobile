import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Header } from "../components/core";
import { CardPost } from "../components/customized";
import { useAuth } from "../hooks";

const { width, height } = Dimensions.get("window");

const PostScreen = ({ route }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const { userId } = route.params;

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/posts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setPosts(res.data);
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
