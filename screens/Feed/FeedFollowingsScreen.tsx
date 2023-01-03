import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback } from "react";
import { Divider } from "@rneui/themed";
import { Spinner } from "../../components/core";
import { HeaderFeed } from "../../components/customized";
import CardPost from "../../components/customized/Cards/CardPost/CardPost";
import { useAuth, useGetPaginate, useRefreshByUser } from "../../hooks";
import { Post } from "../../models/post";

export const FeedFollowingsScreen = () => {
  const { user } = useAuth();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetPaginate({
      model: "followingsPosts",
      uri: `/users/${user?.id}/posts/get-followings-posts`,
      limit: "20",
    });

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat();

  const renderPost = useCallback(({ item }: ListRenderItemInfo<Post>) => {
    return <CardPost post={item} onShowDetails={() => {}} />;
  }, []);

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={1} />
      <Divider color="#ddd" />
      <FlatList
        //ref={ref}
        refreshControl={refreshControl}
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
