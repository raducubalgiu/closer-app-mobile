import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { Post } from "../../../../models/post";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";

type ListRenderItemPost = {
  id: string;
  postId: Post;
  userId: string;
};

export const SavedPostsTab = ({ user }: { user: User }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${user?.id}/posts/bookmarks`,
    queries: "postType=photo",
    limit: "21",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPost = useCallback(
    ({ item, index }: ListRenderItemInfo<ListRenderItemPost>) => {
      const { postId, userId } = item;
      const { bookable, postType } = postId || {};

      return (
        <GridImageListItem
          onPress={() =>
            navigation.navigate("AllBookmarks", {
              postId: postId?.id,
              userId: userId,
            })
          }
          index={index}
          image={postId?.images[0]?.url}
          bookable={bookable}
          fixed={null}
          postType={postType}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: ListRenderItemPost) => item.id, []);

  if (isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage title={t("posts")} description={t("noFoundSavedPosts")} />
    );
  }

  return (
    <>
      {!loading && (
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          numColumns={3}
          renderItem={renderPost}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
