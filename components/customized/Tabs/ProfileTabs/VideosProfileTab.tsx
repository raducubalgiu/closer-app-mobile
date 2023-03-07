import { FlatList, ListRenderItemInfo, View } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import Animated from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models/post";
import GridImageListItem from "../../ListItems/PostGrid/GridImageListItem";

export const AnimatedFlatList: any = Animated.createAnimatedComponent(FlatList);

const VideosProfileTab = forwardRef((props: any, ref) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${props?.userId}/posts`,
    limit: "6",
    queries: "postType=photo&orientation=portrait",
    enabled: isFocused && !!props?.userId,
  });

  const { isLoading, isFetching, isFetchingNextPage } = options;
  const loading = (isLoading || isFetching) && !isFetchingNextPage;
  const { data: videos, showSpinner, loadMore } = usePaginateActions(options);

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridImageListItem
        onPress={() => {}}
        index={index}
        uri={item?.images[0]?.url}
        orientation={item?.orientation}
        bookable={item.bookable}
        fixed={null}
        postType={item.postType}
      />
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AnimatedFlatList
        ref={ref}
        numColumns={3}
        scrollEnabled={!loading}
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </View>
  );
});

export default memo(VideosProfileTab);
