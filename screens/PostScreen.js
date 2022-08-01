import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import { useCallback } from "react";
import { Header } from "../components/core";
import { CardPost } from "../components/customized";
import { useHttpGet } from "../hooks";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const PostScreen = ({ route }) => {
  const { userId } = route.params;
  const { data: posts } = useHttpGet(`/users/${userId}/posts`);
  const { t } = useTranslation();

  const renderUserPosts = useCallback(
    ({ item }) => <CardPost post={item} />,
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

export default PostScreen;

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
