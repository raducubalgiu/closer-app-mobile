import { ListRenderItemInfo, View, Animated } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models/post";
import GridVideoListItem from "../../ListItems/Grid/GridVideo/GridVideoListItem";

type IProps = {
  userId: string | undefined;
  onScroll: any;
  onMomentumScrollBegin: any;
  onMomentumScrollEnd: any;
  onScrollEndDrag: any;
  contentContainerStyle: any;
  panHandlers: any;
};

const VideosProfileTab = forwardRef((props: IProps, ref: any) => {
  const {
    userId,
    onScroll,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    contentContainerStyle,
    panHandlers,
  } = props;
  const isFocused = useIsFocused();
  const { t } = useTranslation("common");

  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${userId}/posts`,
    limit: "6",
    queries: "postType=video&orientation=portrait",
    enabled: isFocused && !!userId,
  });

  const { isLoading, isFetching, isFetchingNextPage } = options;
  const loading = (isLoading || isFetching) && !isFetchingNextPage;
  const { data: videos, showSpinner, loadMore } = usePaginateActions(options);

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridVideoListItem onPress={() => {}} index={index} post={item} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  if (!isLoading && !isFetchingNextPage && videos?.length === 0) {
    return (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("videoclips")}
        description={t("noFoundVideclips")}
        iconProps={{ name: "video" }}
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
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default memo(VideosProfileTab);
