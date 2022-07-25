import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardPostImage } from "../../Cards/CardPostImage";
import { useHttpGet } from "../../../../hooks";

export const PostsProfileTab = ({ userId, username }) => {
  const navigation = useNavigation();

  const { data: posts } = useHttpGet(`/users/${userId}/posts`);

  const goToPosts = (item) =>
    navigation.navigate("Post", {
      postId: item._id,
      userId: item.user._id,
    });

  return (
    <View style={styles.container}>
      {posts?.map((item, i) => (
        <CardPostImage
          onPress={() => goToPosts(item)}
          key={i}
          index={i}
          image={item?.images[0]?.url}
          bookable={item?.bookable}
          fixed={item?.fixed}
          postType={item?.postType}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
