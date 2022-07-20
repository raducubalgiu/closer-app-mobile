import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CardFollowers } from "../../Cards/CardFollowers";
import axios from "axios";
import { useAuth } from "../../../../hooks/auth";
import { SearchBarInput } from "../../../core";
import { useRefresh } from "../../../../hooks";
import { useTranslation } from "react-i18next";

export const FollowingsTab = (props) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [followings, setFollowings] = useState([]);
  const { t } = useTranslation();

  const fetchFollowings = useCallback(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${props.userId}/follows/followings`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setFollowings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props?.userId, user?.token]);

  useEffect(() => {
    fetchFollowings();
  }, [fetchFollowings]);

  const updateSearch = (text) => {
    setSearch(text);
  };

  const handleRefresh = () => fetchFollowings();
  const { refreshing, onRefresh } = useRefresh(handleRefresh);

  const renderPerson = useCallback(({ item }) => {
    const { avatar, username, name, _id } = item.followeeId;

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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={header}
        data={followings}
        keyExtractor={(item) => item?._id}
        renderItem={renderPerson}
        showsVerticalScrollIndicator={false}
      />
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
