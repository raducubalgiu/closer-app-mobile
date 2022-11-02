import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardPostImage } from "../../Cards/CardPostImage";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGet } from "../../../../hooks";

export const PostsProfileTab = ({ userId }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: posts } = useGet({ uri: `/users/${userId}/posts` });

  const goToPosts = (item) =>
    navigation.navigate("Post", {
      postId: item._id,
      userId: item.user._id,
    });

  const noFoundMessage = (
    <NoFoundMessage
      sx={{ marginTop: 50 }}
      title={t("posts")}
      description={t("noFoundPosts")}
    />
  );

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
