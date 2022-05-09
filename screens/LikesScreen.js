import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../components/core";
import FakeSearchBarSimple from "../components/customized/FakeSearchBar/FakeSearchBarSimple";
import axios from "axios";
import CardFollowers from "../components/customized/Cards/CardFollowers";

const LikesScreen = (props) => {
  const { postId, followingId } = props.route.params;
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/posts/${postId}/get-likes`)
      .then((res) => {
        setLikes(res.data.likes);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Aprecieri" divider={true} />
      <View style={styles.listContainer}>
        <FlatList
          style={{ paddingTop: 5 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={4}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <>
              {loading && <ActivityIndicator />}
              {!loading && <FakeSearchBarSimple />}
            </>
          }
          data={likes}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <CardFollowers
              onGoToUser={() => {}}
              onFollowUser={() => {}}
              avatar={item?.user?.avatar}
              username={item?.user?.username}
              name={item?.user?.name}
              followingId={followingId}
              userId={item?.user?._id}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: { marginHorizontal: 15, flex: 1 },
});
