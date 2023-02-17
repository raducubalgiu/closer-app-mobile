import {
  StyleSheet,
  RefreshControl,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Divider, Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostVideoOverviewListItem from "../../components/customized/ListItems/Post/PostVideoOverviewListItem";
import CardPost from "../../components/customized/Cards/CardPost/CardPost";
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
  usePaginateActions,
} from "../../hooks";
import { Post } from "../../models/post";
import theme from "../../assets/styles/theme";
import { RootStackParams } from "../../navigation/rootStackParams";
import CustomAvatar from "../../components/core/Avatars/CustomAvatar";
import { trimFunc } from "../../utils";
import { LinearGradient } from "expo-linear-gradient";

const { black, primary } = theme.lightColors || {};

export const FeedExploreScreen = () => {
  const { user } = useAuth();
  const [postId, setPostId] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const postsOptions = useGetPaginate({
    model: "allPosts",
    uri: `/posts/get-all-posts`,
    queries: "postType=photo",
    limit: "10",
  });

  const videosOptions = useGetPaginate({
    model: "allPosts",
    uri: `/posts/get-all-posts`,
    limit: "5",
    queries: "postType=video&orientation=portrait",
  });

  const storiesOptions = useGetPaginate({
    model: "followings",
    uri: `/users/${user?.id}/followings`,
    limit: "20",
  });

  const {
    refetch,
    isLoading: isLoadingPosts,
    isFetchingNextPage,
  } = postsOptions;

  const {
    data: posts,
    loadMore,
    showSpinner,
  } = usePaginateActions(postsOptions);

  const { isLoading: isLoadingVideos } = videosOptions;
  const { data: videos } = usePaginateActions(videosOptions);
  const { data: stories } = usePaginateActions(storiesOptions);
  const loading = (isLoadingPosts || isLoadingVideos) && !isFetchingNextPage;

  useRefreshOnFocus(refetch);

  const renderPost = useCallback(({ item }: ListRenderItemInfo<Post>) => {
    return <CardPost post={item} onShowDetails={() => showDetails(item)} />;
  }, []);

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

  const keyExtractor = useCallback((item: Post) => item?.id, []);
  const keyExtractorVideo = useCallback((item: Post) => item?.id, []);

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

  const { mutate: handleDelete } = useDelete({
    uri: `/users/${user?.id}/posts/${postId}`,
    onSuccess: () => {
      CLOSE_BS();
      setVisible(false);
    },
  });

  const header = (
    <>
      <Stack direction="row" sx={{ paddingLeft: 10, marginVertical: 5 }}>
        <Text style={{ color: black, fontWeight: "600", fontSize: 14.5 }}>
          Clipuri video
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
        data={videos}
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
        sx={{ marginTop: 5, marginBottom: 15, marginLeft: 10 }}
      >
        <Text style={{ color: black, fontWeight: "600", fontSize: 15 }}>
          {t("stories")}
        </Text>
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
      </Stack>
      <FlatList
        data={stories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: any) => {
          return (
            <Stack sx={{ paddingLeft: 10 }}>
              <LinearGradient
                colors={[`${primary}`, `#ffd9b3`]}
                start={{ x: 1, y: 0.4 }}
                end={{ x: 1.4, y: 3 }}
                style={{ borderRadius: 200 }}
              >
                <CustomAvatar
                  avatar={item?.followeeId?.avatar}
                  size={65}
                  sx={{ margin: 2.1, borderWidth: 1.5, borderColor: "white" }}
                />
              </LinearGradient>
              <Text style={{ fontSize: 13, marginTop: 5 }}>
                {trimFunc(item?.followeeId?.username, 10)}
              </Text>
            </Stack>
          );
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

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
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
            data={posts}
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
