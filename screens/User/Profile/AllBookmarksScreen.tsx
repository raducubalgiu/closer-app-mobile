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
import CardPost from "../../../components/customized/Cards/CardPost/CardPost";
import { Post } from "../../../models/post";

const { width, height } = Dimensions.get("window");

export const AllBookmarksScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: bookmarks } = useGet({
    model: "allBookmarks",
    uri: `/users/${user?._id}/bookmarks/posts`,
  });

  const renderUserBookmarks = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <CardPost post={item?.post} onShowDetails={() => {}} />
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
  const keyExtractor = useCallback((item: Post) => item?._id, []);

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
