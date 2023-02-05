import { ListRenderItemInfo, Animated, Dimensions } from "react-native";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import GridImageListItem from "../../ListItems/PostGrid/GridImageListItem";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";

type IProps = {
  userId: string;
  onScroll: () => void;
};
const { height } = Dimensions.get("window");

export const PostsProfileTab = ({ userId, onScroll }: IProps) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "posts",
      uri: `/users/${userId}/posts`,
      limit: "24",
      queries: "postType=photo",
      enabled: isFocused && !!userId,
    });

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat() || [];

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridImageListItem
        onPress={() => {}}
        index={index}
        image={item?.images[0]?.url}
        bookable={item.bookable}
        fixed={null}
        postType={item.postType}
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

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingTop: 25, paddingBottom: 150 }} />;
    } else {
      return null;
    }
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Animated.FlatList
      ListHeaderComponent={header}
      numColumns={3}
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderPosts}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      contentContainerStyle={{ minHeight: height, paddingBottom: 100 }}
    />
  );
};
