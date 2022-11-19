import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CardPostImage } from "../../Cards/CardPostImage";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { FlashList } from "@shopify/flash-list";
import { Post } from "../../../../models/post";

export const SavedPostsTab = ({ user }) => {
  const navigation = useNavigation();
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
    uri: `/users/${user?._id}/posts/bookmarks`,
    limit: "21",
    enabled: isFocused,
  });

  const renderPosts = useCallback(({ item, index }) => {
    const { post } = item;
    const { bookable, postType } = post || {};
    const { user } = item;

    return (
      <CardPostImage
        onPress={() =>
          navigation.navigate("AllBookmarks", {
            postId: post?._id,
            userId: user?._id,
          })
        }
        index={index}
        image={post?.images[0]?.url}
        bookable={bookable}
        fixed={null}
        postType={postType}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Post) => item._id, []);

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

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title={t("posts")} description={t("noFoundSavedPosts")} />
    );

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        data={pages?.map((page) => page.results).flat()}
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
