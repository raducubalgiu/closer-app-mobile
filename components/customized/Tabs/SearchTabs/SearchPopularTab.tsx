import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useGet, useGetPaginate } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { HeadingWithAction, Spinner } from "../../../core";
import UserListItem from "../../ListItems/UserListItem";
import GridImageListItem from "../../ListItems/PostGrid/GridImageListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";
import { Hashtag } from "../../../../models/hashtag";
import { Post } from "../../../../models/post";
import { usePaginateActions } from "../../../../hooks";

export const SearchPopularTab = ({ search }: { search: string }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { data: users, isLoading: isLoadingUsers } = useGet({
    model: "users",
    uri: `/users/search?search=${search}&page=1&limit=2`,
    enabled: isFocused,
    enableId: search,
  });
  const { data: hashtags, isLoading: isLoadingHashtags } = useGet({
    model: "users",
    uri: `/hashtags/search?search=${search}&page=1&limit=3`,
    enabled: isFocused,
    enableId: search,
  });

  const options = useGetPaginate({
    model: "searchPosts",
    uri: `/posts`,
    limit: "42",
    queries: `search=${search}&postType=photo`,
    enabled: isFocused,
  });

  const { isLoading: isLoadingPosts, isFetchingNextPage } = options;

  const {
    data: posts,
    loadMore,
    showSpinner,
  } = usePaginateActions({ ...options });

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
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <GridImageListItem
        onPress={() => {}}
        index={index}
        image={item?.images[0]?.url}
        bookable={item.bookable}
        fixed={null}
        postType={item.postType}
      />
    ),
    []
  );

  const usersList = (
    <FlatList
      ListHeaderComponent={
        <HeadingWithAction
          heading={t("users")}
          seeAll
          collection={users?.results}
          onSeeAll={goToUsers}
        />
      }
      data={users?.results}
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
            collection={hashtags?.results}
            onSeeAll={goToHashtags}
          />
        </>
      }
      data={hashtags?.results}
      keyExtractor={(item) => item.id}
      renderItem={renderHashtags}
    />
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {hashtagsList}
          <HeadingWithAction heading={t("populars")} collection={posts} />
        </>
      }
      numColumns={3}
      data={posts}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderPopularPosts}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0}
    />
  );
};
