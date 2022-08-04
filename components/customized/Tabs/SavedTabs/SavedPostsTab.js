import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { CardPostImage } from "../../Cards/CardPostImage";
import theme from "../../../../assets/styles/theme";
import { useHttpGet } from "../../../../hooks";
import { Spinner } from "../../../core";

const { width } = Dimensions.get("window");

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
    <View style={styles.screen}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  box: {
    width: width / 3,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
  },
  bookable: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
  },
  fixed: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    backgroundColor: "white",
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  fixedText: {
    fontFamily: "Exo-SemiBold",
    fontSize: 12,
    //textTransform: "uppercase",
    color: theme.lightColors.black,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
  },
});
