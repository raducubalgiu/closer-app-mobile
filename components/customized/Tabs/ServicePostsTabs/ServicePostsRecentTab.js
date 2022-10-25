import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useHttpGet } from "../../../../hooks";
import { CardPostImage } from "../../Cards/CardPostImage";

export const ServicePostsRecentTab = ({ serviceId }) => {
  const { data: posts } = useHttpGet(`/services/${serviceId}/posts/popular`);

  const renderPost = useCallback(({ item, index }) => {
    const { images, bookable, postType } = item;

    return (
      <CardPostImage
        onPress={() => {}}
        index={index}
        image={images[0]?.url}
        bookable={bookable}
        fixed={null}
        postType={postType}
      />
    );
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={renderPost}
      numColumns={3}
      showsVerticalScrollIndicator={false}
    />
  );
};
