import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth, useGet } from "../../../hooks";
import { Header } from "../../../components/core";
import PostListItem from "../../../components/customized/ListItems/Post/PostListItem";
import { Post } from "../../../models/post";

const { width, height } = Dimensions.get("window");

export const AllBookmarksScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: bookmarks } = useGet({
    model: "allBookmarks",
    uri: `/users/${user?.id}/bookmarks/posts`,
  });

  const renderUserBookmarks = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <PostListItem post={item?.post} isLiked={false} isBookmarked={false} />
    ),
    []
  );
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: width,
      offset: height * index,
      index,
    }),
    []
  );
  const keyExtractor = useCallback((item: Post) => item?.id, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("savedPosts")} divider />
      </SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialScrollIndex={3}
        getItemLayout={getItemLayout}
        data={bookmarks}
        keyExtractor={keyExtractor}
        renderItem={renderUserBookmarks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 500,
  },
});
