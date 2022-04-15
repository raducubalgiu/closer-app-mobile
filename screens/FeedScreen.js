import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import CardPost from "../components/customized/Cards/CardPost";
import { Colors } from "../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import FeedHeader from "../components/customized/Headers/FeedHeader";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FeedScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const fetchPosts = useCallback(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/posts`)
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <FeedHeader />
      </SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
          />
        )}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
  welcome: {
    fontFamily: "Exo-SemiBold",
    fontSize: 21,
    marginBottom: 2.5,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  container: {
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
    color: Colors.textDark,
    paddingLeft: 10,
    marginTop: 30,
  },
});
