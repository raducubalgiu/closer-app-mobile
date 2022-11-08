import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth, useHttpGet } from "../../../hooks";
import { Header } from "../../../components/core";
import { CardPost } from "../../../components/customized";

const { width, height } = Dimensions.get("window");

export const AllBookmarksScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: bookmarks } = useHttpGet(`/users/${user?._id}/bookmarks/posts`);

  const renderUserBookmarks = useCallback(
    ({ item }) => <CardPost post={item?.post} />,
    []
  );
  const getItemLayout = useCallback(
    (data, index) => ({
      length: width,
      offset: height * index,
      index,
    }),
    []
  );
  const keyExtractor = useCallback((item) => item?._id, []);

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
