import { Animated, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useGetPaginate } from "../../../../hooks";
import GridImageListItem from "../../ListItems/PostGrid/GridImageListItem";
import { useTranslation } from "react-i18next";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";

type IProps = { serviceId: string; onScroll: () => void; headerHeight: number };

export const ServicePostsRecentTab = ({
  serviceId,
  onScroll,
  headerHeight,
}: IProps) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "servicePostsRecent",
    uri: `/services/${serviceId}/posts/recent`,
    limit: "15",
    enabled: isFocused,
  });

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridImageListItem
        onPress={() => {}}
        index={index}
        image={item.images[0]?.url}
        bookable={item.bookable}
        fixed={null}
        postType={item.postType}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

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

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat();

  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );
  }

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <Animated.FlatList
        numColumns={3}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: headerHeight }}
      />
    </>
  );
};
