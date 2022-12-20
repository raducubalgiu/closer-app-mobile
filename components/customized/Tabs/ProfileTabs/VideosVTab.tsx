import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";
import { GridVideoVLitemItem } from "../../ListItems/PostGrid/GridVideoVListItem";

export const VideosVTab = ({ userId }: { userId: string }) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "posts",
      uri: `/users/${userId}/posts`,
      limit: "12",
      queries: "postType=video&orientation=portrait",
      enabled: isFocused,
    });

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat() || [];

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridVideoVLitemItem
        uri={item.images[0]?.url}
        index={index}
        onPress={() => {}}
      />
    ),
    []
  );

  let header;
  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    header = (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("posts")}
        description={t("noFoundPosts")}
      />
    );
  }

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 50 }} />;
    } else {
      return null;
    }
  };

  return (
    <FlatList
      ListHeaderComponent={header}
      numColumns={3}
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderPosts}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};
