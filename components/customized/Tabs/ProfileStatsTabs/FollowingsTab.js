import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardFollowers } from "../../Cards/CardFollowers";
import { SearchBarInput } from "../../../core";
import { useHttpGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const FollowingsTab = ({ userId }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const { data: followings } = useHttpGet(
    `/users/${userId}/follows/followings`
  );

  const updateSearch = (text) => {
    setSearch(text);
  };

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

  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <View style={styles.screen}>
      {followings?.length > 0 && (
        <FlatList
          ListHeaderComponent={header}
          data={followings}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          showsVerticalScrollIndicator={false}
        />
      )}
      {followings?.length === 0 && (
        <NoFoundMessage
          title={t("followings")}
          description={t("noFoundFollowings")}
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
