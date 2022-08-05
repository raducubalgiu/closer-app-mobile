import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { CardPostImage } from "../../Cards/CardPostImage";
import { useHttpGet } from "../../../../hooks";
import { Spinner } from "../../../core";

export const SavedPostsTab = ({ user }) => {
  const navigation = useNavigation();

  const { data: bookmarks, loading } = useHttpGet(
    `/users/${user?._id}/bookmarks/posts`
  );

  const renderBookmark = useCallback(({ item, i }) => {
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
        index={i}
        image={post?.images[0]?.url}
        bookable={bookable}
        fixed={null}
        postType={postType}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <FlatList
          data={bookmarks}
          numColumns={3}
          keyExtractor={(item) => item?._id}
          renderItem={renderBookmark}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};
