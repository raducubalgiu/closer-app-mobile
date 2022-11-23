import { SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useRef, useState } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import {
  useSheet,
  useAuth,
  useGetPaginate,
  useRefreshByUser,
  useDelete,
} from "../hooks";
import { Spinner } from "../components/core";
import { PostInfoSheet, HeaderFeed } from "../components/customized";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "../components/customized/Modals/ConfirmModal";
import CardPost from "../components/customized/Cards/CardPost/CardPost";

export const FeedScreen = () => {
  const { user } = useAuth();
  const [postId, setPostId] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetPaginate({
      model: "allPosts",
      uri: `/posts/get-all-posts`,
      limit: "10",
    });

  const { pages } = data || {};
  const allPosts = pages?.map((page) => page.results).flat();

  const showConfirm = useCallback(() => {
    CLOSE_BS();
    setVisible(true);
  }, []);

  const sheetContent = <PostInfoSheet onShowConfirm={showConfirm} />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    ["10%", "30%"],
    sheetContent
  );
  const showDetails = useCallback((item) => {
    setPostId(item._id);
    SHOW_BS();
  }, []);

  const renderAllPosts = useCallback(({ item }) => {
    return <CardPost post={item} onShowDetails={() => showDetails(item)} />;
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const { mutate: handleDelete } = useDelete({
    uri: `/users/${user?._id}/posts/${postId}`,
    onSuccess: () => {
      CLOSE_BS();
      setVisible(false);
    },
  });

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
      <HeaderFeed
        onFetchPosts={(index: number) => console.log("INDEX!!", index)}
      />
      <Divider color="#ddd" />
      <FlashList
        ref={ref}
        refreshControl={refreshControl}
        data={allPosts}
        renderItem={renderAllPosts}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={636}
      />
      {BOTTOM_SHEET}
      <ConfirmModal
        title={t("deletePost")}
        description={t("areYouSureDeletePost")}
        visible={visible}
        onDelete={handleDelete}
        onCloseModal={() => setVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
});
