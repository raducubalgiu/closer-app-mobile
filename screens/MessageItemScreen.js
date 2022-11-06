import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeaderMessageItem from "../components/customized/Layout/Headers/HeaderMessageItem";
import { useAuth } from "../hooks/auth";
import axios from "axios";
import MessReceivedItem from "../components/customized/ListItems/MessReceivedItem";
import MessSentItem from "../components/customized/ListItems/MessSentItem";
import { usePost } from "../hooks";
import { FooterMessageItem } from "../components/customized";
import { CustomAvatar, Header, Stack } from "../components/core";
import { Divider } from "@rneui/themed";
import theme from "../assets/styles/theme";

const MessageItemScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { userId, name, username, avatar, checkmark } = route.params;
  const { followersCount, followingsCount } = route.params;

  useEffect(() => {
    if (user) {
      axios
        .post(
          `${process.env.BASE_ENDPOINT}/messages/get-messages`,
          {
            from: user?._id,
            to: userId,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => setMessages(res.data.projectMessages))
        .catch((err) => console.log(err));
    }
  }, [user, userId]);

  const isSenderSame = (prev, current) => {
    return prev?.fromSelf === current?.fromSelf;
  };

  const renderMessage = useCallback(
    ({ item, index }) => {
      if (!item.fromSelf) {
        while (isSenderSame(item, messages[index - 1])) {
          return (
            <MessReceivedItem
              avatar={avatar}
              item={item}
              displayAvatar={false}
            />
          );
        }
        return (
          <MessReceivedItem avatar={avatar} item={item} displayAvatar={true} />
        );
      }

      return <MessSentItem item={item} />;
    },
    [isSenderSame]
  );

  const keyExtractor = useCallback((item) => item._id, []);

  const { mutate: sendMessage } = usePost({
    uri: `/messages/add-message`,
    onSuccess: (res) => {
      setMessages((messages) =>
        messages.concat({ ...res.data, fromSelf: true })
      );
    },
  });

  const header = (
    <Stack sx={{ marginVertical: 40 }}>
      <CustomAvatar avatar={avatar} size={100} />
      <Text
        style={{
          fontWeight: "600",
          fontSize: 18,
          marginTop: 10,
          marginBottom: 2.5,
        }}
      >
        {name}
      </Text>
      <Text style={{ color: theme.lightColors.grey0 }}>@{username}</Text>
      <Stack direction="row">
        <Text style={{ color: theme.lightColors.grey0, fontSize: 13 }}>
          {followingsCount} de urmariri
        </Text>
        <Text> - </Text>
        <Text style={{ color: theme.lightColors.grey0, fontSize: 13 }}>
          {followersCount} de urmaritori
        </Text>
      </Stack>
    </Stack>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderMessageItem
        name={name}
        username={username}
        avatar={avatar}
        checkmark={checkmark}
      />
      <Divider color="#ddd" />
      <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <FlatList
          ListHeaderComponent={header}
          initialScrollIndex={messages.length - 1}
          getItemLayout={(data, index) => {
            return { length: 100, offset: 100 * index, index };
          }}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        />
        <FooterMessageItem
          message={message}
          onSendMessage={() => {
            setMessage("");
            sendMessage({
              message: { text: message },
              from: user?._id,
              to: userId,
            });
          }}
          onChangeText={(text) => setMessage(text)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
