import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Divider } from "@rneui/themed";
import { useAuth } from "../hooks/auth";
import theme from "../assets/styles/theme";
import {
  IconButton,
  Header,
  CustomAvatar,
  Spinner,
  Stack,
} from "../components/core";
import { CommentListItem } from "../components/customized";
import { useTranslation } from "react-i18next";
import { useHttpGet, useHttpPost } from "../hooks";
import DisplayText from "../components/customized/DisplayText/DisplayText";
import { useNavigation } from "@react-navigation/native";

const { grey0, primary } = theme.lightColors;

const CommentsScreen = ({ route }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    postId,
    description,
    avatar,
    username,
    name,
    date,
    focus,
    creatorId,
  } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [prevComment, setPrevComment] = useState(null);
  const refInput = useRef();
  const { t } = useTranslation();
  const commentsEndpoint = `/posts/${postId}/comments`;

  const { loading } = useHttpGet(commentsEndpoint, (data) => setComments(data));

  const handleUpdateAfterPost = (res) => {
    setComment("");
    setComments([
      {
        _id: res?._id,
        comment: res?.comment,
        user: {
          username: user?.username,
          avatar: user?.avatar,
        },
        previousComment: commentId,
        createdAt: res?.createdAt,
      },
      ...comments,
    ]);
  };
  const { makePost } = useHttpPost(commentsEndpoint, handleUpdateAfterPost);

  const handleComment = () =>
    makePost({
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

  const renderHeader = useCallback(
    () => (
      <>
        <View style={styles.headerCont}>
          <CustomAvatar size={32.5} iconSize={15} avatar={avatar} />
          <View
            style={{
              marginLeft: 10,
              flex: 1,
            }}
          >
            <DisplayText
              text={description}
              maxWords={10}
              username={username}
              goToUserAllInfo={goToUserExtra}
            />
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 15 }} />
      </>
    ),
    [username, description, avatar]
  );

  const handleReply = (text, commentId, previousComment) => {
    refInput.current.focus();
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

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} divider={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={renderHeader}
            data={comments}
            keyExtractor={(item) => item?._id}
            renderItem={!loading && renderComment}
            contentContainerStyle={{ padding: 15 }}
          />
          {loading && <Spinner />}
        </View>
        <Divider />
        <Stack direction="row" sx={styles.inputCont}>
          <CustomAvatar size={50} iconSize={20} avatar={user?.avatar} />
          <TextInput
            ref={refInput}
            onChangeText={(text) => setComment(text)}
            autoCapitalize="sentences"
            autoFocus={focus}
            value={comment}
            placeholder={t("addComment")}
            style={styles.input}
          />
          <IconButton
            size={20}
            iconName="arrowup"
            iconType="antdesign"
            sx={styles.iconBtn}
            color="white"
            onPress={handleComment}
          />
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, justifyContent: "space-between" },
  headerCont: { flexDirection: "row" },
  date: {
    color: grey0,
    marginTop: 1,
    fontSize: 13,
  },
  inputCont: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12.5,
    borderRadius: 25,
    marginLeft: 10,
  },
  iconBtn: {
    backgroundColor: primary,
    padding: 7.5,
    marginLeft: 10,
    borderRadius: 50,
  },
});
