import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CardFollowers } from "../../../customized";
import axios from "axios";
import { useAuth } from "../../../../hooks/auth";
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

  const renderPerson = ({ item }) => {
    const { avatar, username, name, _id } = item.followeeId;

    return (
      <CardFollowers
        avatar={avatar}
        username={username}
        name={name}
        followeeId={_id}
      />
    );
  };

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
              height={60}
            />
          }
          data={followings}
          keyExtractor={(item) => item?._id}
          renderItem={renderPerson}
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
