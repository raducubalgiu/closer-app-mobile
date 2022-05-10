import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CardFollowers from "../../Cards/CardFollowers";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../../../context/auth";
import { Spinner, SearchBarInput } from "../../../core";

export const FollowingsTab = (props) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFollowings = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${props.userId}/get-followings`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setFollowings(res.data.followings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props?.userId, user?.token]);

  useEffect(() => {
    fetchFollowings();
  }, [fetchFollowings]);

  const updateSearch = (text) => {
    setSearch(text);
  };

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
    <View style={styles.screen}>
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <SearchBarInput
              showCancel={false}
              placeholder="Cauta"
              value={search}
              updateValue={updateSearch}
            />
          }
          data={followings}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <CardFollowers
              avatar={item?.followeeId?.avatar?.url}
              username={item?.followeeId?.username}
              name={item?.followeeId?.name}
              followeeId={item?.followeeId?._id}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
