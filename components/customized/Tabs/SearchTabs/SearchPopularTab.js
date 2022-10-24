import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useHttpGet } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { SearchPopularHeading } from "../../Headings/SearchPopularHeading";
import { Spinner } from "../../../core";
import { UserListItem } from "../../ListItems/UserListItem";
import { CardPostImage } from "../../Cards/CardPostImage";

const { width } = Dimensions.get("window");

export const SearchPopularTab = ({ search }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: users, loading: loadUsers } = useHttpGet(
    `/users/search?search=${search}&page=1&limit=2`
  );
  const { data: hashtags, loading: loadHashtags } = useHttpGet(
    `/hashtags/search?search=${search}&page=1&limit=3`
  );
  const { data: bookablePosts, loading: loadBookable } = useHttpGet(
    `/posts/get-bookable-posts?search=${search}&latlng=26.100195,44.428286`
  );
  const { data: popularPosts, loading: loadPosts } = useHttpGet(
    `/posts/get-all-posts?search=${search}&page=1&limit=20`
  );

  const headerUsers = useCallback(
    () => (
      <SearchPopularHeading heading={t("users")} seeAll collection={users} />
    ),
    [users]
  );
  const headerBookable = useCallback(
    () => (
      <SearchPopularHeading
        heading={t("bookables")}
        seeAll
        collection={bookablePosts}
        onSeeAll={() =>
          navigation.navigate("SearchAll", { screen: "SearchBookable", search })
        }
      />
    ),
    [bookablePosts]
  );
  const headerHashtags = useCallback(
    () => (
      <SearchPopularHeading
        heading={t("hashtags")}
        seeAll
        collection={hashtags}
        onSeeAll={() =>
          navigation.navigate("SearchAll", { screen: "SearchHashtags", search })
        }
      />
    ),
    [hashtags]
  );
  const headerPopularPosts = useCallback(
    () => (
      <SearchPopularHeading heading={t("populars")} collection={popularPosts} />
    ),
    [popularPosts]
  );

  const renderUsers = useCallback(
    ({ item }) => (
      <UserListItem
        avatar={item.avatar}
        followeeId={item._id}
        username={item.username}
        name={item.name}
        counter={item.counter}
        checkmark={item.checkmark}
        sx={{ paddingHorizontal: 15, marginBottom: 20 }}
      />
    ),
    []
  );

  const renderBookables = useCallback(({ item, index }) => {
    const { posts } = item;
    const { images, bookable, postType } = posts;

    return (
      <CardPostImage
        index={index}
        image={images[0]?.url}
        bookable={bookable}
        postType={postType}
        col={2}
      />
    );
  }, []);

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
    ({ item }) => (
      <View style={styles.boxImage}>
        <Image
          source={{ uri: `${item?.images[0]?.url}` }}
          containerStyle={styles.image}
        />
      </View>
    ),
    []
  );

  const popularPostsList = useCallback(
    () => (
      <FlatList
        ListHeaderComponent={headerPopularPosts}
        numColumns={2}
        data={popularPosts}
        keyExtractor={(item) => item._id}
        renderItem={renderPopularPosts}
      />
    ),
    [headerPopularPosts, popularPosts, renderPopularPosts]
  );

  const hashtagsList = useCallback(
    () => (
      <FlatList
        ListHeaderComponent={headerHashtags}
        data={hashtags}
        keyExtractor={(item) => item._id}
        renderItem={renderHashtags}
        ListFooterComponent={popularPostsList}
      />
    ),
    [headerHashtags, hashtags, popularPostsList]
  );

  const bookableList = useCallback(
    () => (
      <FlatList
        ListHeaderComponent={headerBookable}
        numColumns={2}
        data={bookablePosts}
        keyExtractor={(item) => item.posts._id}
        renderItem={renderBookables}
        ListFooterComponent={hashtagsList}
      />
    ),
    [headerBookable, bookablePosts, renderBookables, hashtagsList]
  );

  return (
    <View style={{ flex: 1 }}>
      {!loadUsers && !loadBookable && !loadHashtags && !loadPosts && (
        <FlatList
          ListHeaderComponent={headerUsers}
          data={users}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderUsers}
          ListFooterComponent={bookableList}
        />
      )}
      {loadUsers && loadBookable && loadHashtags && loadPosts && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  boxImage: { width: width / 2, flex: 1, margin: 1 },
  image: {
    aspectRatio: 1,
    flex: 1,
  },
});
