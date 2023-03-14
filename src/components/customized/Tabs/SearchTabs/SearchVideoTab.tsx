import { FlatList, StyleSheet, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Post } from "../../../../models";
import GridVideoVListItem from "../../ListItems/Grid/GridVideoVListItem";
import { Spinner } from "../../../core";
import { useIsFocused } from "@react-navigation/native";

export const SearchVideoTab = ({ search }: { search: string }) => {
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "searchVideo",
    uri: `/posts/get-all-posts`,
    queries: "postType=video",
    limit: "20",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: videos, showSpinner, loadMore } = usePaginateActions(options);

  const renderVideo = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridVideoVListItem
        index={index}
        uri={item.images[0].url}
        bookable={item.bookable}
        onPress={() => {}}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);
  const loading = isLoading && !isFetchingNextPage;

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          data={videos}
          numColumns={3}
          keyExtractor={keyExtractor}
          renderItem={renderVideo}
          onEndReached={loadMore}
          ListFooterComponent={showSpinner}
          onEndReachedThreshold={0.3}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});
