import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { Header, Stack, Button, Spinner } from "../components/core";
import { CardPostImage, NoFoundMessage } from "../components/customized";
import theme from "../assets/styles/theme";
import { useHttpGet } from "../hooks";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";

const { grey0, black } = theme.lightColors;

const HashtagScreen = ({ route }) => {
  const { name } = route.params;
  const { t } = useTranslation();

  const {
    data: { postsCount, bookmarksCount },
    loading: loadingHashtag,
  } = useHttpGet(`/hashtags/${name}`);

  const { data: posts, loading: loadingPosts } = useHttpGet(
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

  const header = (
    <Stack
      direction="row"
      align="start"
      justify="start"
      sx={{ padding: 15, marginBottom: 10 }}
    >
      <Stack sx={styles.container}>
        <Text style={{ fontSize: 60, color: black, fontWeight: "300" }}>#</Text>
      </Stack>
      <Stack align="start" justify="between" sx={{ marginLeft: 15, flex: 1 }}>
        <Stack align="start" justify="start" sx={{ flex: 1 }}>
          <Stack direction="row">
            <Icon name="link" type="feather" color={grey0} size={17.5} />
            <Text style={{ ...styles.postsNo, marginLeft: 5 }}>
              {postsCount}{" "}
              {postsCount < 20 ? t("posts").toLowerCase() : "de postari"}
            </Text>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 10 }}>
            <Icon
              name="check-square"
              type="feather"
              color={grey0}
              size={17.5}
            />
            <Text style={{ ...styles.postsNo, marginLeft: 5 }}>
              {bookmarksCount}{" "}
              {bookmarksCount < 20 ? "utilizatori" : "de utilizatori"}
            </Text>
          </Stack>
        </Stack>
        <Button
          sx={{
            borderWidth: 1,
            borderColor: "#ddd",
            paddingVertical: 5,
            paddingHorizontal: 12.5,
            borderRadius: 5,
          }}
        >
          <Stack direction="row">
            <Icon name="bookmark" type="feather" color={black} size={17.5} />
            <Text style={{ color: black, fontWeight: "600", marginLeft: 10 }}>
              {t("addToBookmarks")}
            </Text>
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={`#${name}`} />
      <FlatList
        ListHeaderComponent={!loadingHashtag && header}
        data={posts}
        numColumns={3}
        keyExtractor={(item) => item?._id}
        renderItem={!loadingHashtag && renderPosts}
        ListFooterComponent={
          !loadingHashtag && !loadingPosts && !posts.length && noFoundMessage
        }
      />
      {loadingHashtag || (loadingPosts && <Spinner />)}
    </SafeAreaView>
  );
};

export default HashtagScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  hashtag: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    color: black,
  },
  postsNo: {
    color: grey0,
    fontSize: 14.5,
  },
});
