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

const { width, height } = Dimensions.get("window");

const PostScreen = ({ route }) => {
  const { userId } = route.params;
  const { data: posts } = useHttpGet(`/users/${userId}/posts`);

  const renderUserPosts = useCallback(
    ({ item }) => <CardPost post={item} />,
    []
  );
  const getItemLayout = (data, index) => ({
    length: width,
    offset: height * index,
    index,
  });

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title="Postări" divider />
      </SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialScrollIndex={3}
        getItemLayout={getItemLayout}
        data={posts}
        keyExtractor={(item) => item?._id}
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
