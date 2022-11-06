import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  View,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { usePost, useAuth } from "../hooks";
import {
  FooterMessageItem,
  CardMessageUser,
  MessReceivedItem,
  MessSentItem,
  HeaderMessageItem,
} from "../components/customized";
import { Divider } from "@rneui/themed";

const { height } = Dimensions.get("window");

const MessageItemScreen = ({ route }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { userId, name, username, avatar, checkmark } = route.params;
  const { followersCount, followingsCount } = route.params;

  const { mutate, isLoading } = usePost({
    uri: `/messages/get-messages`,
    onSuccess: (res) => setMessages(res.data.projectMessages),
  });

  useEffect(() => {
    mutate({
      from: user?._id,
      to: userId,
    });
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
  const getItemLayout = useCallback((messages, index) => {
    return { length: 100, offset: 100 * index, index };
  }, []);

  const { mutate: sendMessage } = usePost({
    uri: `/messages/add-message`,
    onSuccess: (res) => {
      setMessages((messages) =>
        messages.concat({ ...res.data, fromSelf: true })
      );
    },
  });

  const onSendMessage = () => {
    setMessage("");
    sendMessage({
      message: { text: message },
      from: user?._id,
      to: userId,
    });
  };

  const header = (
    <CardMessageUser
      name={name}
      username={username}
      avatar={avatar}
      followersCount={followersCount}
      followingsCount={followingsCount}
    />
  );

  return (
    <>
      <View style={styles.statusBar}></View>
      <SafeAreaView style={styles.screen}>
        <HeaderMessageItem
          name={name}
          username={username}
          avatar={avatar}
          checkmark={checkmark}
        />
        <Divider color="#ddd" />
        <KeyboardAvoidingView
          behavior="position"
          style={styles.screen}
          keyboardVerticalOffset={50}
        >
          <FlatList
            ListHeaderComponent={!isLoading && header}
            initialScrollIndex={messages.length - 1}
            getItemLayout={getItemLayout}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.flatList}
          />
          <FooterMessageItem
            message={message}
            onSendMessage={onSendMessage}
            onChangeText={(text) => setMessage(text)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default MessageItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 50,
  },
  statusBar: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    zIndex: 1000,
  },
  flatList: {
    padding: 15,
    minHeight: height - 200,
  },
});
