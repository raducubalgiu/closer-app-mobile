import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import GridImageListItem from "../../ListItems/PostGrid/GridImageListItem";
import GridVideoVListItem from "../../ListItems/PostGrid/GridVideoVListItem";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import {
  FlashList,
  ListRenderItemInfo,
  MasonryFlashList,
} from "@shopify/flash-list";
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

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "posts",
    uri: `/users/${user?.id}/posts/bookmarks`,
    limit: "21",
    enabled: isFocused,
  });

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<ListRenderItemPost>) => {
      const { postId, userId } = item;
      const { bookable, postType } = postId || {};

      if (postType === "video") {
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
            bookable={bookable}
          />
        );
      } else {
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
      }
    },
    []
  );

  const keyExtractor = useCallback((item: ListRenderItemPost) => item.id, []);

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

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat();

  let header;
  if (posts?.length === 0) {
    header = (
      <NoFoundMessage title={t("posts")} description={t("noFoundSavedPosts")} />
    );
  }

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <MasonryFlashList
        ListHeaderComponent={header}
        data={posts}
        keyExtractor={keyExtractor}
        numColumns={3}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={125}
      />
    </>
  );
};
