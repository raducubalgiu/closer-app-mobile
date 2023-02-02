import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ListRenderItemInfo,
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
import { Spinner } from "../components/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "Comments">;

export const CommentsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { postId, description, avatar, username } = route.params;
  const { name, date, focus, creatorId } = route.params;
  const [comments, setComments] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [prevComment, setPrevComment] = useState(null);
  const headerHeight = useHeaderHeight();

  const { isLoading, isFetching } = useGet({
    model: "comments",
    uri: `/posts/${postId}/comments?page=${page}&limit=25`,
    onSuccess: (res) => {
      setNext(res.data.next);
      setComments((comments) => comments.concat(res.data.results));
    },
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
      checkmark: false,
      service: null,
      option: null,
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

  const handleReply = (
    text: string,
    commentId: string,
    previousComment: any
  ) => {
    setComment(`@${text} `);
    setCommentId(commentId);
    setPrevComment(previousComment);
  };

  const renderComment = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <CommentListItem
        item={item}
        onReply={handleReply}
        creatorId={creatorId}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item: any) => item?._id, []);

  const onEndReached = useCallback(() => {
    if (next && !isFetching) setPage(page + 1);
  }, [next, isFetching]);

  let footer;
  if (isLoading || isFetching) {
    footer = <Spinner sx={{ paddingVertical: 20 }} />;
  }

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
          contentContainerStyle={styles.flatlist}
          onEndReached={onEndReached}
          onEndReachedThreshold={0}
          ListFooterComponent={footer}
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
  flatlist: { padding: 15, minHeight: 700 },
});
