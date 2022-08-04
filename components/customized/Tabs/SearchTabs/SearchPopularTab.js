import { StyleSheet, View, FlatList, Dimensions, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useHttpGet } from "../../../../hooks";
import { CardFollowers } from "../../Cards/CardFollowers";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { SearchPopularHeading } from "../../Headings/SearchPopularHeading";
import { Spinner } from "../../../core";

const { width } = Dimensions.get("window");

export const SearchPopularTab = ({ search }) => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: users, loading: loadUsers } = useHttpGet(
    `/users/search?search=${search}&page=1&limit=2`
  );
  const { data: hashtags, loading: loadHashtags } = useHttpGet(
    `/hashtags/search?name=${search}&page=1&limit=3`
  );
  const { data: bookablePosts, loading: loadBookable } = useHttpGet(
    "/posts/get-bookable-posts?latlng=26.100195,44.428286"
  );
  const { data: popularPosts, loading: loadPosts } = useHttpGet(
    `/posts/get-all-posts?page=${page}&limit=12`
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
      <CardFollowers
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

  const renderBookables = useCallback(
    ({ item }) => (
      <View style={styles.boxImage}>
        <Image
          source={{ uri: `${item?.posts?.images[0]?.url}` }}
          containerStyle={styles.image}
        />
      </View>
    ),
    []
  );

  const renderHashtags = useCallback(
    ({ item }) => (
      <HashtagListItem
        sx={{ paddingHorizontal: 15 }}
        name={item.name}
        postsCount={100}
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
