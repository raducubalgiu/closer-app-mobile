import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CardFollowers } from "../../Cards/CardFollowers";
import { useAuth } from "../../../../hooks/auth";
import axios from "axios";
import { SearchBarInput } from "../../../core";
import { useTranslation } from "react-i18next";

export const FollowersTab = ({ userId }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState([]);
  const { t } = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/follows/followers`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setFollowers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [userId, user?.token])
  );

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
