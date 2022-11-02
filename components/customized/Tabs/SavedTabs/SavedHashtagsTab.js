import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { HashtagListItem } from "../../ListItems/HashtagListItem";

export const SavedHashtagsTab = ({ user }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "hashtags",
      uri: `/users/${user?._id}/hashtags/bookmarks`,
      limit: "25",
    });

  const noFoundMessage = (
    <NoFoundMessage
      title={t("hashtags")}
      description={t("noFoundSavedHashtags")}
    />
  );

  const renderHashtags = useCallback(({ item }) => {
    const { name, postsCount } = item?.hashtag;

    return (
      <HashtagListItem
        name={name}
        postsCount={postsCount}
        onPress={() => navigation.navigate("Hashtag", { name: name })}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};

  return (
    <FlatList
      ListHeaderComponent={
        !isLoading &&
        !isFetchingNextPage &&
        pages[0]?.results?.length === 0 &&
        noFoundMessage
      }
      contentContainerStyle={{ padding: 15 }}
      data={pages?.map((page) => page.results).flat()}
      keyExtractor={keyExtractor}
      renderItem={renderHashtags}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};
