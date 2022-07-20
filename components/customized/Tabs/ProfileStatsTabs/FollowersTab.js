import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { CardFollowers } from "../../Cards/CardFollowers";
import { useAuth } from "../../../../hooks/auth";
import axios from "axios";
import { SearchBarInput } from "../../../core";

export const FollowersTab = (props) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState([]);

  const fetchFollowers = useCallback(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${props.userId}/follows/followers`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        console.log("Fetch followers");
        setFollowers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props?.userId, user?.token]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  const updateSearch = (text) => setSearch(text);

  const renderPerson = useCallback(({ item }) => {
    const { avatar, username, name, _id } = item.userId;

    return (
      <CardFollowers
        avatar={avatar}
        username={username}
        name={name}
        followeeId={_id}
      />
    );
  }, []);

  const header = useCallback(
    () => (
      <SearchBarInput
        showCancel={false}
        placeholder={t("search")}
        value={search}
        updateValue={updateSearch}
        height={60}
      />
    ),
    []
  );

  return (
    <View style={styles.screen}>
      {followers.length > 0 && (
        <FlatList
          ListHeaderComponent={header}
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
