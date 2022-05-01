import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CardFollowers from "../../Cards/CardFollowers";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../../context/auth";
import axios from "axios";
import { Spinner, SearchBarInput } from "../../../core";

const FollowersTabDetails = (props) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchFollowers = useCallback(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${props.userId}/get-followers`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setFollowers(res.data.followers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props.userId, user?.token]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  const updateSearch = (text) => setSearch(text);

  const goToUser = (userId) => {
    navigation.navigate("ProfileGeneral", { userId });
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
            />
          }
          data={followers}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <CardFollowers
              onGoToUser={() => goToUser(item?._id)}
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

export default FollowersTabDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
