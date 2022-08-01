import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardFollowers } from "../../Cards/CardFollowers";
import { SearchBarInput, Spinner } from "../../../core";
import { useHttpGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const FollowingsTab = ({ userId }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const { data: followings, loading } = useHttpGet(
    `/users/${userId}/follows/followings`
  );

  const updateSearch = useCallback((search) => setSearch(search), [search]);

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
      title={t("followings")}
      description={t("noFoundFollowings")}
    />
  );

  return (
    <View style={styles.screen}>
      {!loading && (
        <FlatList
          ListHeaderComponent={followings?.length && header}
          data={followings}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            !loading && !followings?.length && noFoundMessage
          }
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
