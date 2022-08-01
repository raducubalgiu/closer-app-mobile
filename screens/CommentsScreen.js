import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
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
import { CardComment } from "../components/customized";
import { useTranslation } from "react-i18next";
import { useHttpGet, useHttpPost } from "../hooks";

const CommentsScreen = ({ route }) => {
  const { user } = useAuth();
  const { postId, description, avatar, username, date, focus } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  const { loading } = useHttpGet(`/posts/${postId}/get-comments`, (data) =>
    setComments(data)
  );

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
        createdAt: res?.createdAt,
      },
      ...comments,
    ]);
  };
  const { makePost } = useHttpPost(`/comments`, handleUpdateAfterPost);

  const handleComment = () =>
    makePost({
      comment,
      post: postId,
      user: user?._id,
    });

  const renderHeader = useCallback(
    () => (
      <>
        <View style={styles.headerCont}>
          <CustomAvatar size={32.5} iconSize={15} avatar={avatar} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text>
              <Text style={styles.username}>{username} </Text>
              {description}
            </Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <Divider />
      </>
    ),
    [username, description, avatar]
  );

  const renderComment = useCallback(({ item }) => {
    const { user, comment, createdAt } = item || {};

    return (
      <CardComment
        userId={user?._id}
        avatar={user?.avatar}
        username={user?.username}
        name={user?.name}
        comment={comment}
        createdAt={createdAt}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} divider={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={{ flex: 1 }}>
          {loading && <Spinner />}
          {!loading && (
            <FlatList
              ListHeaderComponent={renderHeader}
              data={comments}
              keyExtractor={(item) => item?._id}
              renderItem={renderComment}
            />
          )}
        </View>
        <Divider />
        <Stack direction="row" sx={styles.inputCont}>
          <CustomAvatar size={40} iconSize={20} avatar={user?.avatar} />
          <TextInput
            onChangeText={(text) => setComment(text)}
            autoCapitalize="sentences"
            autoFocus={focus}
            value={comment}
            placeholder={t("addComment")}
            style={styles.input}
          />
          <IconButton
            size={17.5}
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
  headerCont: { flexDirection: "row", margin: 15 },
  username: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
  },
  date: {
    color: theme.lightColors.grey0,
    marginTop: 5,
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
    backgroundColor: theme.lightColors.primary,
    padding: 7.5,
    marginLeft: 10,
    borderRadius: 50,
  },
});
