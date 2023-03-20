import { View, ListRenderItemInfo, Animated } from "react-native";
import { forwardRef, useCallback, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models/post";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type IProps = {
  userId: string | undefined;
  onScroll: any;
  onMomentumScrollBegin: any;
  onMomentumScrollEnd: any;
  onScrollEndDrag: any;
  contentContainerStyle: any;
  panHandlers: any;
  posts: any;
};

const PostsProfileTab = forwardRef(
  (
    {
      userId,
      onScroll,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      contentContainerStyle,
      panHandlers,
      posts,
    }: IProps,
    ref: any
  ) => {
    const isFocused = useIsFocused();
    const { t } = useTranslation("common");
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const options = useGetPaginate({
      model: "posts",
      uri: `/users/${userId}/posts`,
      limit: "24",
      queries: "postType=photo",
      enabled: isFocused && !!userId,
    });

    const { isLoading, isFetchingNextPage } = options;
    const { showSpinner, loadMore } = usePaginateActions(options);

    const renderPosts = useCallback(
      ({ item, index }: ListRenderItemInfo<Post>) => {
        return (
          <GridImageListItem
            index={index}
            post={item}
            posts={posts}
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
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          ref={ref}
          {...panHandlers}
          onScroll={isFocused ? onScroll : null}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          contentContainerStyle={contentContainerStyle}
          numColumns={3}
          keyExtractor={keyExtractor}
          renderItem={renderPosts}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          data={posts}
        />
      </View>
    );
  }
);

export default PostsProfileTab;
