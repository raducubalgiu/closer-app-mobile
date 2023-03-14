import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import PostListItem from "../../../components/customized/ListItems/Post/PostListItem";
import { Header } from "../../../components/core";

type IProps = NativeStackScreenProps<RootStackParams, "UserAllPosts">;

export const UserAllPostsScreen = ({ route }: IProps) => {
  const { posts, index } = route.params;

  const renderPost = useCallback(({ item }: any) => {
    return <PostListItem post={item} isLiked={false} isBookmarked={false} />;
  }, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 670,
      offset: 670 * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Postari" />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        getItemLayout={getItemLayout}
        initialScrollIndex={index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
