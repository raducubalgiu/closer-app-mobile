import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import { useCallback } from "react";
import { Header } from "../components/core";
import CardPost from "../components/customized/Cards/CardPost/CardPost";
import { useGet } from "../hooks";
import { useTranslation } from "react-i18next";
import { Post } from "../models/post";

const { width, height } = Dimensions.get("window");

export const PostScreen = ({ route }) => {
  const { userId } = route.params;
  const { data: posts } = useGet({
    model: "posts",
    uri: `/users/${userId}/posts`,
  });
  const { t } = useTranslation();

  const renderUserPosts = useCallback(
    ({ item }) => <CardPost post={item} onShowDetails={() => {}} />,
    []
  );
  const getItemLayout = useCallback(
    (posts: Post[], index: number) => ({
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
        <Header title={t("posts")} divider />
      </SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialScrollIndex={3}
        getItemLayout={getItemLayout}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderUserPosts}
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
