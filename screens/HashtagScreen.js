import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { Header, Spinner } from "../components/core";
import {
  CardHashtagOverview,
  CardPostImage,
  NoFoundMessage,
} from "../components/customized";
import { useHttpGet } from "../hooks";
import { useTranslation } from "react-i18next";

const HashtagScreen = ({ route }) => {
  const { name } = route.params;
  const { t } = useTranslation();

  const {
    data: { postsCount, bookmarksCount, _id },
    loading: loadHashtag,
  } = useHttpGet(`/hashtags/${name}`);

  const { data: posts, loading: loadPosts } = useHttpGet(
    `/hashtags/${name}/posts`
  );

  const noFoundMessage = (
    <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
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

  const header = useCallback(
    () => (
      <CardHashtagOverview
        bookmarkId={_id}
        postsCount={postsCount}
        bookmarksCount={bookmarksCount}
      />
    ),
    [_id, postsCount, bookmarksCount]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={`#${name}`} />
      <FlatList
        ListHeaderComponent={!loadHashtag && header}
        data={posts}
        numColumns={3}
        keyExtractor={(item) => item?._id}
        renderItem={!loadHashtag && renderPosts}
        ListFooterComponent={
          !loadHashtag && !loadPosts && !posts.length && noFoundMessage
        }
      />
      {loadHashtag || (loadPosts && <Spinner />)}
    </SafeAreaView>
  );
};

export default HashtagScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
});
