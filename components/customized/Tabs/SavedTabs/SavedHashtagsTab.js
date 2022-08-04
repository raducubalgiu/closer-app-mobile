import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useHttpGet } from "../../../../hooks";
import { Spinner } from "../../../core";
import { HashtagListItem } from "../../ListItems/HashtagListItem";

export const SavedHashtagsTab = ({ user }) => {
  const { t } = useTranslation();

  const { data: hashtags, loading } = useHttpGet(
    `/users/${user?._id}/bookmarks/hashtags`
  );

  const noFoundMessage = (
    <NoFoundMessage
      title={t("hashtags")}
      description={t("noFoundSavedHashtags")}
    />
  );

  const renderHashtags = useCallback(
    ({ item }) => (
      <HashtagListItem
        name={item.hashtag.name}
        postsCount={100}
        onPress={() => {}}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item._id, []);

  return (
    <>
      {!loading && (
        <FlatList
          data={hashtags}
          keyExtractor={keyExtractor}
          renderItem={renderHashtags}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
      {!loading && hashtags.length === 0 && noFoundMessage}
      {loading && <Spinner />}
    </>
  );
};
