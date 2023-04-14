import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
} from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { HeadingWithAction, Spinner } from "../../../core";
import UserListItem from "../../ListItems/User/UserListItem";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";
import { Hashtag } from "../../../../models/hashtag";
import { Post } from "../../../../models/post";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const SearchPopularTab = ({ search }: { search: string }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const usersOptions = useGetPaginate({
    model: "users",
    uri: `/users/search`,
    queries: `search=${search}`,
    limit: "3",
    enabled: isFocused,
  });

  const hashtagsOptions = useGetPaginate({
    model: "users",
    uri: `/hashtags/search`,
    queries: `search=${search}`,
    limit: "3",
    enabled: isFocused,
  });

  const postsOptions = useGetPaginate({
    model: "searchPosts",
    uri: `/users/${user?.id}/posts/search`,
    limit: "12",
    queries: `search=${search}&postType=photo`,
    enabled: isFocused,
  });

  const {
    data: posts,
    loadMore,
    showSpinner,
  } = usePaginateActions(postsOptions);
  const { data: users } = usePaginateActions(usersOptions);
  const { data: hashtags } = usePaginateActions(hashtagsOptions);

  const { isLoading, isFetchingNextPage, refetch, isRefetching } =
    hashtagsOptions;
  const loading = (isLoading || isRefetching) && !isFetchingNextPage;

  useRefreshOnFocus(refetch);

  const goToUsers = () => {
    navigation.navigate("SearchAll", {
      screen: "SearchUsers",
      search,
    });
  };
  const goToHashtags = () =>
    navigation.navigate("SearchAll", {
      screen: "SearchHashtags",
      search,
    });

  const renderUsers = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItem
        user={item}
        sx={{ paddingHorizontal: 15, marginBottom: 20 }}
      />
    ),
    []
  );

  const renderHashtags = useCallback(
    ({ item }: ListRenderItemInfo<Hashtag>) => (
      <HashtagListItem
        sx={{ paddingHorizontal: 15 }}
        name={item.name}
        postsCount={item.postsCount}
        onPress={() => navigation.navigate("Hashtag", { name: item.name })}
      />
    ),
    []
  );

  const renderPopularPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<PostListItem>) => {
      const { post } = item;
      return (
        <GridImageListItem
          index={index}
          post={post}
          expirationTime={post?.expirationTime}
          discount={post?.product?.discount}
          posts={posts}
        />
      );
    },
    []
  );

  const usersList = (
    <FlatList
      ListHeaderComponent={
        <HeadingWithAction
          heading={t("users")}
          seeAll
          collection={users}
          onSeeAll={goToUsers}
        />
      }
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={renderUsers}
    />
  );

  const hashtagsList = (
    <FlatList
      ListHeaderComponent={
        <>
          {usersList}
          <HeadingWithAction
            heading={t("hashtags")}
            seeAll
            collection={hashtags}
            onSeeAll={goToHashtags}
          />
        </>
      }
      data={hashtags}
      keyExtractor={(item) => item.id}
      renderItem={renderHashtags}
    />
  );

  return (
    <>
      {!loading && (
        <FlatList
          ListHeaderComponent={
            <>
              {hashtagsList}
              <HeadingWithAction heading={t("populars")} collection={posts} />
            </>
          }
          numColumns={3}
          data={posts}
          keyExtractor={(item: PostListItem) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderPopularPosts}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
