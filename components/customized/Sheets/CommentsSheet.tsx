import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  View,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth, useGetPaginate, usePost } from "../../../hooks";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import { emoji } from "../../../assets/emojis/emoji-comm.json";
import theme from "../../../assets/styles/theme";
import { CommentListItem } from "../ListItems/CommentListItem";
import { NoFoundMessage } from "../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { IconButton, Stack, Spinner } from "../../core";

type IProps = { postId: string };
const { primary, black } = theme.lightColors || {};

export const CommentsSheet = ({ postId }: IProps) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [prevComment, setPrevComment] = useState(null);
  const { t } = useTranslation();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "comments",
    uri: `/posts/${postId}/comments`,
    limit: "5",
  });

  const { mutate } = usePost({ uri: `/posts/${postId}/comments` });
  const handleComment = () => {
    mutate({ postId, comment, userId: user?.id });
    setComment("");
  };

  const { pages } = data || {};
  const comments = pages?.map((page) => page.results).flat();

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

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
    ({ item }: any) => (
      <CommentListItem
        item={item}
        onReply={handleReply}
        creatorId={item.creatorId}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  let header;
  if (!isLoading && !isFetchingNextPage && comments?.length === 0) {
    header = (
      <NoFoundMessage
        title={t("comments")}
        description={t("noFoundComments")}
      />
    );
  }

  const handleEmojies = (emoji: any) =>
    setComment((comment) => comment.concat(emoji.char));

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Stack sx={styles.header}>
          <Text style={styles.headerText}>{t("comments")}</Text>
        </Stack>
        <BottomSheetFlatList
          ListHeaderComponent={header}
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderComment}
          contentContainerStyle={{ padding: 10 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={showSpinner}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={190}
      >
        <View style={styles.footer}>
          <Stack direction="row" sx={styles.emoji}>
            {emoji.map((emoji, i) => (
              <Pressable key={i} onPress={() => handleEmojies(emoji)}>
                <Text style={{ fontSize: 25 }}>{emoji.char}</Text>
              </Pressable>
            ))}
          </Stack>
          <Stack
            direction="row"
            sx={{ marginBottom: insets.bottom, paddingHorizontal: 10 }}
          >
            <CustomAvatar avatar={user?.avatar} size={35} />
            <Stack direction="row" justify="center" sx={styles.inputContainer}>
              <TextInput
                value={comment}
                onChangeText={(text) => setComment(text)}
                placeholder={t("addComment")}
                style={{ flex: 1, padding: 10 }}
              />
              <Stack direction="row">
                <IconButton
                  name="at-sign"
                  type="feather"
                  size={24}
                  color={black}
                  sx={styles.button}
                />
                <IconButton
                  onPress={handleComment}
                  name="arrow-up-circle"
                  type="ionicon"
                  size={30}
                  color={primary}
                  sx={styles.button}
                  disabled={comment.length === 0}
                />
              </Stack>
            </Stack>
          </Stack>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  headerText: { fontWeight: "600", fontSize: 15, color: black },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },
  emoji: {
    padding: 15,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#eee",
  },
  button: { padding: 5, marginRight: 5 },
});
