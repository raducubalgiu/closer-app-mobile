import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Spinner } from "../components/core";
import FakeSearchBarSimple from "../components/customized/FakeSearchBar/FakeSearchBarSimple";
import axios from "axios";
import { CardFollowers } from "../components/customized";
import { useAuth } from "../hooks";

const LikesScreen = (props) => {
  const { user } = useAuth();
  const { postId } = props.route.params;
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/posts/${postId}/get-likes`)
      .then((res) => {
        setLikes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setLoading(false);
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

  const renderPerson = ({ item }) => (
    <CardFollowers
      avatar={item?.user?.avatar}
      username={item?.user?.username}
      name={item?.user?.name}
      followeeId={item?.user?._id}
      userId={user?._id}
    />
  );

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
            <>{!loading && likes.length > 20 && <FakeSearchBarSimple />}</>
          }
          contentContainerStyle={{ marginTop: 10 }}
          data={likes}
          keyExtractor={(item) => item?._id}
          renderItem={loading ? <Spinner /> : renderPerson}
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
