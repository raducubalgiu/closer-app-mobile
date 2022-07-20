import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { CardPostImage } from "../../Cards/CardPostImage";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";

const { width } = Dimensions.get("window");

export const AllSavedTab = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/bookmarks`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => setBookmarks(res.data))
        .catch((err) => console.log(err));
    }, [])
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
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        numColumns={3}
        keyExtractor={(item) => item?._id}
        renderItem={renderBookmark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
