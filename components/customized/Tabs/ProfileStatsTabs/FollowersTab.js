import { StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import CardFollowers from "../../Cards/CardFollowers";
import { useAuth } from "../../../../context/auth";
import axios from "axios";
import { Spinner, SearchBarInput } from "../../../core";

export const FollowersTab = (props) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      axios
        .get(
          `${process.env.BASE_ENDPOINT}/users/${props.userId}/get-followers`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          console.log("Fetch followers");
          setFollowers(res.data.followers);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, [props.userId, user?.token])
  );

  const updateSearch = (text) => setSearch(text);

  return (
    <View style={styles.screen}>
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          ListHeaderComponent={
            <SearchBarInput
              showCancel={false}
              placeholder="Cauta"
              value={search}
              updateValue={updateSearch}
              height={60}
            />
          }
          data={followers}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <CardFollowers
              avatar={item?.userId?.avatar}
              username={item?.userId?.username}
              name={item?.userId?.name}
              followeeId={item?.userId?._id}
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
