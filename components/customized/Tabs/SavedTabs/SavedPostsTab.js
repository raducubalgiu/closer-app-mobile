import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CardPostImage } from "../../Cards/CardPostImage";
import { useHttpGet } from "../../../../hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const SavedPostsTab = ({ user }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: posts, loading } = useHttpGet(
    `/users/${user?._id}/bookmarks/posts`
  );

  const renderBookmark = useCallback(({ item, index }) => {
    const { post } = item;
    const { bookable, postType } = post || {};
    const { user } = item;

    return (
      <CardPostImage
        onPress={() =>
          navigation.navigate("AllBookmarks", {
            postId: post?._id,
            userId: user?._id,
          })
        }
        index={index}
        image={post?.images[0]?.url}
        bookable={bookable}
        fixed={null}
        postType={postType}
      />
    );
  }, []);

  const noFoundProducts = (
    <NoFoundMessage title={t("posts")} description={t("noFoundSavedPosts")} />
  );

  return (
    <View style={{ flex: 1 }}>
      {!posts?.length && !loading && noFoundProducts}
      {!loading && (
        <FlatList
          data={posts}
          numColumns={3}
          keyExtractor={(item) => item?._id}
          renderItem={renderBookmark}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};
