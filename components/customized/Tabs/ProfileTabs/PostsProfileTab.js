import { StyleSheet, Dimensions, View } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Image, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CompleteProfile from "../../CompleteProfile/CompleteProfile";
import NoFoundPosts from "../../NotFoundContent/NoFoundPosts";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { CardPostImage } from "../../Cards/CardPostImage";

const { width, height } = Dimensions.get("window");

export const PostsProfileTab = ({ userId, username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/posts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    }, [userId, user])
  );

  let noFoundPosts;
  if (posts.length === 0 && user?._id !== userId) {
    noFoundPosts = (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("posts")}
        description={`${t("postsCreatedBy")} ${username} ${t("willApearHere")}`}
      />
    );
  } else if (posts.length === 0 && user?._id === userId) {
    noFoundPosts = <NoFoundPosts />;
  }
  let completeProfile;
  if (user?._id === userId) {
    completeProfile = <CompleteProfile />;
  }

  return (
    <View style={styles.container}>
      {posts.map((item, i) => (
        <CardPostImage
          onPress={() =>
            navigation.navigate("Post", {
              postId: item._id,
              userId: item.user._id,
            })
          }
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
