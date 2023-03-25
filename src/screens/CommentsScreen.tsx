import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ListRenderItemInfo,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import {
  CommentListItem,
  FooterComments,
  CardPostDescription,
} from "../components/customized";
import { useAuth, useGet, usePost } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { Header, Spinner } from "../components/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { CommentsViewCreateEnum } from "../ts";

type IProps = NativeStackScreenProps<RootStackParams, "Comments">;

export const CommentsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { post } = route.params;
  const { id, description, createdAt, userId } = post;
  const { username, avatar, settings } = userId;
  const { view, create } = settings?.comments;
  const { t } = useTranslation("common");
  const [comments, setComments] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [prevComment, setPrevComment] = useState(null);
  const headerHeight = useHeaderHeight();

  const { isLoading, isFetching } = useGet({
    model: "comments",
    uri: `/posts/${id}/comments?page=${page}&limit=25`,
    onSuccess: (res) => {
      setNext(res.data.next);
      setComments((comments) => comments.concat(res.data.results));
    },
  });

  const { mutate } = usePost({
    uri: `/posts/${id}/comments`,
    onSuccess: () => setComment(""),
  });

  const handleComment = () =>
    mutate({
      comment,
      post: id,
      user: user?.id,
      previousComment: prevComment ? prevComment : commentId,
    });

  const goToUserExtra = () =>
    navigation.push("ProfileGeneral", {
      username,
      service: null,
      option: null,
    });

  const onEndReached = useCallback(() => {
    if (next && !isFetching) setPage(page + 1);
  }, [next, isFetching]);

  let footer;
  if (isLoading || isFetching) {
    footer = <Spinner sx={{ paddingVertical: 20 }} />;
  }

  const renderHeader = (
    <>
      <CardPostDescription
        avatar={avatar}
        username={username}
        description={description}
        date={createdAt}
        onGoToUserAllInfo={goToUserExtra}
      />
      <Divider style={{ marginVertical: 15 }} />
    </>
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
        creatorId={userId.id}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item: any) => item?._id, []);

  const viewComments = view === CommentsViewCreateEnum.ALL ? comments : [];
  const createComments = create === CommentsViewCreateEnum.ALL;

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} />
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={headerHeight + 100}
          style={{ flex: 1, justifyContent: "space-between" }}
        >
          <FlatList
            ListHeaderComponent={renderHeader}
            data={viewComments}
            keyExtractor={keyExtractor}
            renderItem={renderComment}
            onEndReached={onEndReached}
            onEndReachedThreshold={0}
            ListFooterComponent={footer}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
          {createComments && (
            <FooterComments
              comment={comment}
              onChangeText={(text) => setComment(text)}
              onHandleComment={handleComment}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, justifyContent: "space-between" },
});
