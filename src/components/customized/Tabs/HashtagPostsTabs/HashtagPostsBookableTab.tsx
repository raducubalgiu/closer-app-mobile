import { Animated, ListRenderItemInfo } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";

type IProps = { name: string; onScroll: () => void; headerHeight: number };

export const HashtagPostsBookableTab = ({
  name,
  onScroll,
  headerHeight,
}: IProps) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "hBookable",
    uri: `/hashtags/${name}/posts/bookable=true`,
    limit: "30",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => (
      <GridImageListItem
        index={index}
        post={item}
        posts={posts}
        discount={item?.product.discount}
        expirationTime={item?.expirationTime}
        onPress={() => {}}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );
  }

  return (
    <>
      {isLoading && !isFetchingNextPage && <Spinner />}
      <Animated.FlatList
        numColumns={3}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingBottom: headerHeight }}
      />
    </>
  );
};
