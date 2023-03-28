import {
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
  ActivityIndicator,
} from "react-native";
import { memo, useCallback } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { Post } from "../../../../ts";
import { Spinner } from "../../../core";

type IProps = { userId: string };

const MapPostsTab = ({ userId }: IProps) => {
  const options = useGetPaginate({
    model: "posts",
    uri: `/users/${userId}/posts`,
    limit: "24",
    queries: "postType=photo",
  });

  const { isLoading, isFetching, isFetchingNextPage } = options;
  const loading = (isLoading || isFetching) && !isFetchingNextPage;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPost = useCallback(({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <GridImageListItem
        index={index}
        post={item}
        posts={posts}
        expirationTime={item.expirationTime}
        discount={item?.product?.discount}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  return (
    <>
      {!loading && (
        <BottomSheetFlatList
          numColumns={3}
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderPost}
          bounces={false}
          onEndReached={loadMore}
          ListFooterComponent={showSpinner}
        />
      )}
      {loading && <ActivityIndicator style={{ marginVertical: 50 }} />}
    </>
  );
};

export default memo(MapPostsTab);

const styles = StyleSheet.create({});
