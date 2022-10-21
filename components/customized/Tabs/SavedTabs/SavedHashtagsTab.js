import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useHttpGet } from "../../../../hooks";
import { Spinner } from "../../../core";
import { HashtagListItem } from "../../ListItems/HashtagListItem";

export const SavedHashtagsTab = ({ user }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { data: hashtags, loading } = useHttpGet(
    `/users/${user?._id}/hashtags/bookmarks`
  );

  const noFoundMessage = (
    <NoFoundMessage
      title={t("hashtags")}
      description={t("noFoundSavedHashtags")}
    />
  );

  const renderHashtags = useCallback(({ item }) => {
    const { name, postsCount } = item.hashtag;

    return (
      <HashtagListItem
        name={name}
        postsCount={postsCount}
        onPress={() => navigation.navigate("Hashtag", { name })}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item._id, []);

  return (
    <>
      {!loading && hashtags.length > 0 && (
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
