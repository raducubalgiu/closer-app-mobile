import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Post } from "../../../../models/post";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";
import GridVideoVListItem from "../../ListItems/PostGrid/GridVideoVListItem";

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
    limit: "21",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage, isFetching } = options;
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

  if (videos?.length === 0) {
    return (
      <NoFoundMessage
        title={t("videoclips")}
        description={t("noFoundSavedVideo")}
      />
    );
  }

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        data={videos}
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
