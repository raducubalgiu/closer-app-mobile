import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../src/hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { Post } from "../../../../models/post";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";
import GridVideoVListItem from "../../ListItems/Grid/GridVideoVListItem";

type ListRenderItemPost = {
  id: string;
  postId: Post;
  userId: string;
};

export const SavedVideoTab = ({ user }: { user: User }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${user?.id}/posts/bookmarks`,
    queries: "postType=video",
    limit: "21",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: videos, loadMore, showSpinner } = usePaginateActions(options);

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<ListRenderItemPost>) => {
      const { postId, userId } = item;
      return (
        <GridVideoVListItem
          onPress={() =>
            navigation.navigate("AllBookmarks", {
              postId: postId?.id,
              userId: userId,
            })
          }
          index={index}
          uri={postId?.images[0]?.url}
          bookable={postId.bookable}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: ListRenderItemPost) => item.id, []);

  if (!isLoading && !isFetchingNextPage && videos?.length === 0) {
    return (
      <NoFoundMessage
        title={t("videoclips")}
        description={t("noFoundSavedVideo")}
      />
    );
  }

  return (
    <>
      {!loading && (
        <FlatList
          data={videos}
          keyExtractor={keyExtractor}
          numColumns={3}
          renderItem={renderPosts}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
