import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuth, useGet } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { SearchPopularHeading } from "../../Headings/SearchPopularHeading";
import { Spinner } from "../../../core";
import { UserListItem } from "../../ListItems/UserListItem";
import { CardPostImage } from "../../Cards/CardPostImage";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export const SearchPopularTab = ({ search }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const { data: users, isLoading: loadUsers } = useGet({
    model: "users",
    uri: `/users/search?search=${search}&page=1&limit=2`,
  });
  const { data: hashtags, isLoading: loadHashtags } = useGet({
    model: "users",
    uri: `/hashtags/search?search=${search}&page=1&limit=3`,
  });

  const fetchData = async (page, search) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/posts/get-all-posts?search=${search}&page=${page}&limit=12`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const {
    data: popularPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isPreviousData,
  } = useInfiniteQuery(
    ["popularPosts", search],
    ({ pageParam = 1 }) => fetchData(pageParam, search),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
      },
      enabled: !isPreviousData && isFocused,
    }
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 50 }} />;
    } else {
      return null;
    }
  };
  const { pages } = popularPosts || {};

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
    ({ item }) => (
      <UserListItem
        user={item}
        isFollow={false}
        sx={{ paddingHorizontal: 15, marginBottom: 20 }}
      />
    ),
    []
  );

  const renderHashtags = useCallback(
    ({ item }) => (
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
    ({ item, index }) => (
      <CardPostImage
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

  const popularPostsList = useCallback(
    () => (
      <FlatList
        ListHeaderComponent={
          <SearchPopularHeading
            heading={t("populars")}
            collection={pages?.map((page) => page.results)}
          />
        }
        numColumns={3}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={useCallback((item) => item._id, [])}
        renderItem={renderPopularPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    ),
    [renderPopularPosts, popularPosts]
  );

  const hashtagsList = useCallback(
    () => (
      <FlatList
        ListHeaderComponent={
          <SearchPopularHeading
            heading={t("hashtags")}
            seeAll
            collection={hashtags?.results}
            onSeeAll={goToHashtags}
          />
        }
        data={hashtags?.results}
        keyExtractor={(item) => item._id}
        renderItem={renderHashtags}
        ListFooterComponent={popularPostsList}
      />
    ),
    [hashtags, popularPostsList]
  );

  return (
    <FlatList
      ListHeaderComponent={
        <SearchPopularHeading
          heading={t("users")}
          seeAll
          collection={users?.results}
          onSeeAll={goToUsers}
        />
      }
      data={users?.results}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={renderUsers}
      ListFooterComponent={hashtagsList}
    />
  );
};
