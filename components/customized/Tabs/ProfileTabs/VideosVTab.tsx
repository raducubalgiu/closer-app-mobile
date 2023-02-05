import { Dimensions, ListRenderItemInfo, Animated } from "react-native";
import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";
import GridVideoVListItem from "../../ListItems/PostGrid/GridVideoVListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type IProps = { userId: string; onScroll: () => void };
const { height } = Dimensions.get("window");

export const VideosVTab = ({ userId, onScroll }: IProps) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "posts",
      uri: `/users/${userId}/posts`,
      limit: "6",
      queries: "postType=video&orientation=portrait",
      enabled: isFocused,
    });

  const { pages } = data || {};
  const videos = pages?.map((page) => page.results).flat() || [];

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridVideoVListItem
        uri={item.images[0]?.url}
        index={index}
        onPress={() =>
          navigation.navigate("Videos", {
            userId,
            initialIndex: index,
          })
        }
      />
    ),
    []
  );

  let header;
  if (!isLoading && !isFetchingNextPage && videos?.length === 0) {
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
    <Animated.FlatList
      ListHeaderComponent={header}
      numColumns={3}
      data={videos}
      keyExtractor={keyExtractor}
      renderItem={renderPosts}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      onScroll={onScroll}
      contentContainerStyle={{ minHeight: height }}
      showsVerticalScrollIndicator={false}
    />
  );
};
