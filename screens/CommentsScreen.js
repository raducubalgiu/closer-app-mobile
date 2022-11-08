import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  CommentListItem,
  FooterComments,
  CardPostDescription,
} from "../components/customized";
import { useAuth, useGet, usePost } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

export const CommentsScreen = ({ route }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { postId, description, avatar, username } = route.params;
  const { name, date, focus, creatorId } = route.params;
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [prevComment, setPrevComment] = useState(null);
  const headerHeight = useHeaderHeight();

  const { data: comments } = useGet({
    model: "comments",
    uri: `/posts/${postId}/comments`,
  });

  const { mutate } = usePost({
    uri: `/posts/${postId}/comments`,
    onSuccess: () => setComment(""),
  });

  const handleComment = () =>
    mutate({
      comment,
      post: postId,
      user: user?._id,
      previousComment: prevComment ? prevComment : commentId,
    });

  const goToUserExtra = () =>
    navigation.push("ProfileGeneral", {
      userId: user?._id,
      avatar,
      username,
      name,
    });

  const renderHeader = (
    <CardPostDescription
      avatar={avatar}
      username={username}
      description={description}
      date={date}
      onGoToUserAllInfo={goToUserExtra}
    />
  );

  const handleReply = (text, commentId, previousComment) => {
    setComment(`@${text} `);
    setCommentId(commentId);
    setPrevComment(previousComment);
  };

  const renderComment = useCallback(
    ({ item }) => (
      <CommentListItem
        item={item}
        onReply={handleReply}
        creatorId={creatorId}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.container}
        keyboardVerticalOffset={headerHeight + 70}
      >
        <FlatList
          ListHeaderComponent={renderHeader}
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderComment}
          contentContainerStyle={{ padding: 15, minHeight: 700 }}
        />
        <FooterComments
          comment={comment}
          onChangeText={(text) => setComment(text)}
          focus={focus}
          avatar={avatar}
          onHandleComment={handleComment}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, justifyContent: "space-between", marginBottom: 50 },
});
