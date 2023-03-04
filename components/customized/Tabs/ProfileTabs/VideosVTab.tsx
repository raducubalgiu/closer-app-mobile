import { Dimensions, Animated, ListRenderItemInfo } from "react-native";
import { memo, useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models/post";
import GridVideoVListItem from "../../ListItems/PostGrid/GridVideoVListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
// import { AnimatedFlashList, ListRenderItemInfo } from "@shopify/flash-list";

type IProps = {
  userId: string;
  onScroll: () => void;
};
const { height } = Dimensions.get("window");

const VideosVTab = ({ userId, onScroll }: IProps) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${userId}/posts`,
    limit: "6",
    queries: "postType=video&orientation=portrait",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: videos, showSpinner, loadMore } = usePaginateActions(options);

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridVideoVListItem
        uri={item.images[0]?.url}
        bookable={item.bookable}
        index={index}
        onPress={() =>
          navigation.push("UserVideos", {
            id: index,
            videos,
          })
        }
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
    <Animated.FlatList
      numColumns={3}
      data={videos}
      scrollToOverflowEnabled={true}
      scrollEventThrottle={16}
      keyExtractor={keyExtractor}
      renderItem={renderPosts}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      onScroll={onScroll}
      //estimatedItemSize={186}
      contentContainerStyle={{ paddingTop: 300 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default memo(VideosVTab);
