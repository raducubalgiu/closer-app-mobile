import { FlatList, ListRenderItemInfo, View } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import Animated from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models/post";
import GridVideoListItem from "../../ListItems/Grid/GridVideo/GridVideoListItem";

export const AnimatedFlatList: any = Animated.createAnimatedComponent(FlatList);
type IProps = { userId: string | undefined; onScroll: any; sharedProps: any };

const VideosProfileTab = forwardRef((props: IProps, ref) => {
  const { userId, onScroll, sharedProps } = props;
  const isFocused = useIsFocused();
  const { t } = useTranslation();

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
      <AnimatedFlatList
        ref={ref}
        {...sharedProps}
        onScroll={onScroll}
        numColumns={3}
        scrollEnabled={!loading}
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
