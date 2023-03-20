import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { Post } from "../../../../models";
import { Spinner } from "../../../core";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";

export const SearchBookablesTab = ({ search }: { search: string }) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "searchBookables",
    uri: `/posts/search`,
    queries: `search=${search}&bookable=true`,
    limit: "42",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: posts, loadMore, showSpinner } = usePaginateActions(options);

  const renderPost = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => {
      return (
        <GridImageListItem
          onPress={() => {}}
          index={index}
          post={item}
          posts={posts}
          discount={item?.product?.discount}
          expirationTime={item?.expirationTime}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage title={t("bookables")} description={t("noFoundOffers")} />
    );
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          numColumns={3}
          data={posts}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
        />
      )}
    </>
  );
};
