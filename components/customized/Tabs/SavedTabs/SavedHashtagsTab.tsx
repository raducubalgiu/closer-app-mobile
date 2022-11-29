import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Hashtag } from "../../../../models/hashtag";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";
import { User } from "../../../../models/user";

export const SavedHashtagsTab = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
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

  const renderHashtags = useCallback(({ item }: ListRenderItemInfo<any>) => {
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
  const hashtags = pages?.map((page) => page.results).flat();

  let header;
  if (hashtags?.length === 0) {
    return (
      <NoFoundMessage
        title={t("hashtags")}
        description={t("noFoundSavedHashtags")}
      />
    );
  }

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={hashtags}
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
