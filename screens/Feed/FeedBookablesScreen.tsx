import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import CardPost from "../../components/customized/Cards/CardPost/CardPost";
import { Spinner } from "../../components/core";
import { HeaderFeed } from "../../components/customized";
import {
  useGetPaginate,
  useRefreshByUser,
  useRefreshOnFocus,
} from "../../hooks";
import { Post } from "../../models/post";

export const FeedBookablesScreen = () => {
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetPaginate({
      model: "allPosts",
      uri: `/posts/get-all-posts`,
      limit: "10",
      queries: "postType=photo&bookable=true",
    });

  useRefreshOnFocus(refetch);

  const { pages } = data || {};
  const allPosts = pages?.map((page) => page.results).flat();

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
      <HeaderFeed indexLabel={2} />
      <Divider color="#ddd" />
      <FlatList
        ref={ref}
        refreshControl={refreshControl}
        data={allPosts}
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
    backgroundColor: "white",
    flex: 1,
  },
});
