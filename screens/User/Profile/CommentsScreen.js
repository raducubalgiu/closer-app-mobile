import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "@rneui/themed";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import theme from "../../../assets/styles/theme";
import {
  IconButton,
  Header,
  UserAvatar,
  CustomAvatar,
} from "../../../components/core";
import moment from "moment";

const CommentsScreen = (props) => {
  const { user } = useAuth();
  const { postId, description, avatar, username, date, focus } =
    props.route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/posts/${postId}/comments`)
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.log(err));
  }, []);

  const handleComment = () => {
    axios
      .post(
        `${process.env.BASE_ENDPOINT}/comments`,
        {
          comment,
          post: postId,
          user: user?._id,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        const commentRes = res.data.comment;
        console.log("COMMENT RES", commentRes);
        setComment("");
        setComments([
          {
            _id: commentRes?._id,
            comment: commentRes?.comment,
            user: {
              username: user?.username,
              avatar: user?.avatar,
            },
            createdAt: commentRes?.createdAt,
          },
          ...comments,
        ]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Comentarii" divider={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={styles.headerCont}>
                  <CustomAvatar size={32.5} iconSize={15} avatar={avatar} />
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text>
                      <Text style={styles.username}>{username}</Text>
                      {description}
                    </Text>
                    <Text style={styles.date}>{date}</Text>
                  </View>
                </View>
                <Divider />
              </>
            }
            data={comments}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => (
              <View style={styles.commentsCont}>
                <UserAvatar
                  size={32.5}
                  iconSize={15}
                  avatar={item?.user?.avatar[0]?.url}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text>
                    <Text style={styles.username}>{item?.user?.username}</Text>
                    {item?.comment}
                  </Text>
                  <Text style={styles.date}>
                    {moment(item?.createdAt).startOf("hour").fromNow()}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        <Divider />
        <View style={styles.inputCont}>
          <UserAvatar size={45} iconSize={20} avatar={user?.avatar} />
          <TextInput
            onChangeText={(text) => setComment(text)}
            autoCapitalize="sentences"
            autoFocus={focus}
            value={comment}
            placeholder="Adauga un comentariu..."
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
        </View>
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
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0t,
    fontSize: 13,
    marginTop: 5,
  },
  commentsCont: {
    flexDirection: "row",
    padding: 15,
  },
  inputCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
