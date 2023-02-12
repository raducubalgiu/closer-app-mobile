import {
  StyleSheet,
  RefreshControl,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Divider, Icon } from "@rneui/themed";
import { Spinner, Stack } from "../../components/core";
import {
  PostInfoSheet,
  HeaderFeed,
  ConfirmModal,
} from "../../components/customized";
import {
  useSheet,
  useAuth,
  useGetPaginate,
  useRefreshByUser,
  useRefreshOnFocus,
  useDelete,
} from "../../hooks";
import CardPost from "../../components/customized/Cards/CardPost/CardPost";
import { Post } from "../../models/post";
import PostVideoOverviewListItem from "../../components/customized/ListItems/Post/PostVideoOverviewListItem";
import theme from "../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { first } from "lodash";

const { black, grey0 } = theme.lightColors || {};

export const FeedExploreScreen = () => {
  const { user } = useAuth();
  const [postId, setPostId] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isLoading: isLoadingPosts,
  } = useGetPaginate({
    model: "allPosts",
    uri: `/posts/get-all-posts`,
    limit: "10",
    queries: "postType=photo",
  });

  const { data: videos, isLoading: isLoadingVideos } = useGetPaginate({
    model: "allPosts",
    uri: `/posts/get-all-posts`,
    limit: "5",
    queries: "postType=video&orientation=portrait",
  });

  useRefreshOnFocus(refetch);

  const { pages } = data || {};
  const allPosts = pages?.map((page) => page.results).flat();
  const allVideos = videos?.pages?.map((page) => page.results).flat();

  const loading = (isLoadingPosts || isLoadingVideos) && !isFetchingNextPage;

  const showConfirm = useCallback(() => {
    CLOSE_BS();
    setVisible(true);
  }, []);

  const sheetContent = <PostInfoSheet onShowConfirm={showConfirm} />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    ["10%", "30%"],
    sheetContent
  );
  const showDetails = useCallback((item: any) => {
    setPostId(item.id);
    SHOW_BS();
  }, []);

  const renderPost = useCallback(({ item }: ListRenderItemInfo<Post>) => {
    return <CardPost post={item} onShowDetails={() => showDetails(item)} />;
  }, []);

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  const { mutate: handleDelete } = useDelete({
    uri: `/users/${user?.id}/posts/${postId}`,
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

  const renderVideo = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => {
      return (
        <PostVideoOverviewListItem
          uri={item?.images[0]?.url}
          id={item.id}
          onPress={() =>
            navigation.push("FeedVideoExplore", { initialIndex: index })
          }
        />
      );
    },
    []
  );

  const keyExtractorVideo = useCallback((item: Post) => item?.id, []);

  const header = (
    <>
      <Stack direction="row" sx={{ paddingLeft: 10, marginBottom: 5 }}>
        <Text style={{ color: black, fontWeight: "600", fontSize: 14.5 }}>
          Videoclipuri
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate("FeedVideoExplore", { initialIndex: 0 })
          }
        >
          <Stack
            direction="row"
            sx={{
              paddingVertical: 2.5,
              paddingHorizontal: 15,
            }}
          >
            <Icon name="arrow-right" />
            <Text style={{ color: black, fontWeight: "600", fontSize: 13 }}>
              Vezi tot
            </Text>
          </Stack>
        </Pressable>
      </Stack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={allVideos}
        keyExtractor={keyExtractorVideo}
        renderItem={renderVideo}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 5,
        }}
      />
      <Divider color="#ddd" style={{ marginTop: 15, marginBottom: 10 }} />
      <Stack
        direction="row"
        justify="start"
        sx={{ marginTop: 5, marginBottom: 10, marginLeft: 10 }}
      >
        <Text style={{ color: black, fontWeight: "600", fontSize: 15 }}>
          În trending
        </Text>
      </Stack>
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={0} />
      <>
        {!loading && (
          <FlatList
            ref={ref}
            ListHeaderComponent={header}
            refreshControl={refreshControl}
            data={allPosts}
            renderItem={renderPost}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={showSpinner}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
          />
        )}
        {loading && <Spinner />}
      </>
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
