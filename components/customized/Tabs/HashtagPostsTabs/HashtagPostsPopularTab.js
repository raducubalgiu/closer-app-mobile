import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHttpGet } from "../../../../hooks";
import { CardPostImage } from "../../Cards/CardPostImage";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";

export const HashtagPostsPopularTab = ({ name }) => {
  const { t } = useTranslation();

  const { data: posts, loading: loadPosts } = useHttpGet(
    `/hashtags/${name}/posts/popular`
  );

  const renderPosts = useCallback(({ item, index }) => {
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

  const noFoundPosts = (
    <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
  );

  return (
    <>
      {!posts?.length && !loadPosts && noFoundPosts}
      {!loadPosts && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          numColumns={3}
          renderItem={renderPosts}
          showsVerticalScrollIndicator={false}
        />
      )}
      {loadPosts && <Spinner />}
    </>
  );
};
