import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardFollowers } from "../../Cards/CardFollowers";
import { SearchBarInput, Spinner } from "../../../core";
import { useHttpGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const FollowersTab = ({ userId }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const { data: followers, loading } = useHttpGet(
    `/users/${userId}/follows/followers`
  );

  const updateSearch = useCallback((search) => setSearch(search), [search]);

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

  const header = (
    <SearchBarInput
      showCancel={false}
      placeholder={t("search")}
      value={search}
      onChangeText={updateSearch}
      height={60}
    />
  );

  const keyExtractor = useCallback((item) => item?._id, []);

  const noFoundMessage = (
    <NoFoundMessage
      title={t("followers")}
      description={t("noFoundFollowers")}
    />
  );

  return (
    <View style={styles.screen}>
      {!loading && (
        <FlatList
          ListHeaderComponent={followers?.length && header}
          data={followers}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={!loading & !followers?.length && noFoundMessage}
        />
      )}
      {loading && <Spinner />}
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
