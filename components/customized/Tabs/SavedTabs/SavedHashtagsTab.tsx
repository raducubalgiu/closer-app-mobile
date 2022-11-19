import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { FlashList } from "@shopify/flash-list";
import { Hashtag } from "../../../../models/hashtag";

export const SavedHashtagsTab = ({ user }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "hashtags",
    uri: `/users/${user?._id}/hashtags/bookmarks`,
    limit: "25",
    enabled: isFocused,
  });

  const renderHashtags = useCallback(({ item }) => {
    const { name, postsCount } = item?.hashtag;

    return (
      <HashtagListItem
        name={name}
        postsCount={postsCount}
        onPress={() => navigation.navigate("Hashtag", { name })}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Hashtag) => item?._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 20 }} />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage
        title={t("hashtags")}
        description={t("noFoundSavedHashtags")}
      />
    );

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderHashtags}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={62}
      />
    </>
  );
};
