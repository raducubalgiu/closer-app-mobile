import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useHttpGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { UserListItem } from "../../ListItems/UserListItem";

export const FollowingsTab = ({ userId }) => {
  const { t } = useTranslation();

  const { data: followings, loading } = useHttpGet(
    `/users/${userId}/follows/followings`
  );

  const renderPerson = useCallback(({ item }) => {
    const { avatar, username, name, _id } = item.followeeId;

    return (
      <UserListItem
        avatar={avatar}
        username={username}
        name={name}
        followeeId={_id}
      />
    );
  }, []);

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
          data={followings}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            !loading && !followings?.length && noFoundMessage
          }
          contentContainerStyle={{ paddingVertical: 15 }}
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
