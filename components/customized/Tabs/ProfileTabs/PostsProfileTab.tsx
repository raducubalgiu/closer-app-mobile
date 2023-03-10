import { View, ListRenderItemInfo } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models/post";
import Animated from "react-native-reanimated";

const PostsProfileTab = forwardRef((props: any, ref) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${props?.userId}/posts`,
    limit: "24",
    queries: "postType=photo",
    enabled: isFocused && !!props?.userId,
  });

  const { isLoading, isFetching, isFetchingNextPage } = options;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => {
      return (
        <GridImageListItem
          onPress={() => {}}
          index={index}
          item={item}
          expirationTime={item.expirationTime}
          discount={item?.product?.discount}
        />
      );
    },
    [posts]
  );

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("posts")}
        description={t("noFoundPosts")}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Animated.FlatList
        {...props}
        ref={ref}
        numColumns={3}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        data={posts}
        estimatedItemSize={155}
      />
    </View>
  );
});

export default memo(PostsProfileTab);
