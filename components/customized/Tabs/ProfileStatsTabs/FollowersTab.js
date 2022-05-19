import { StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { CardFollowers } from "../../../customized";
import { useAuth } from "../../../../hooks/auth";
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

  const renderPerson = ({ item }) => {
    const { avatar, username, name, _id } = item.userId;

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
          renderItem={renderPerson}
          showsVerticalScrollIndicator={false}
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
