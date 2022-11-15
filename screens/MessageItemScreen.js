import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Camera } from "expo-camera";
import { usePost, useAuth, useGet } from "../hooks";
import {
  FooterMessageItem,
  CardMessageUser,
  MessReceivedItem,
  MessSentItem,
  HeaderMessageItem,
} from "../components/customized";
import { Divider } from "@rneui/themed";
import moment from "moment";
import { Spinner } from "../components/core";
import { useNavigation } from "@react-navigation/native";

export const MessageItemScreen = ({ route }) => {
  const { user } = useAuth();
  const [permission] = Camera.useCameraPermissions();
  const { _id, name, username, avatar, checkmark } = route.params?.item;
  const { followersCount, followingsCount } = route.params?.item;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const navigation = useNavigation();

  const onReceiveData = (res) => {
    setMessages((messages) => messages.concat(res.data.messages));
    setHasNext(res.data.hasNext);
  };

  const { data: conversation, refetch: refetchIsConversation } = useGet({
    model: "isConversation",
    uri: `/users/${user?._id}/conversations/${_id}`,
  });

  const { isLoading, isRefetching } = useGet({
    model: "messages",
    uri: `/users/${user?._id}/messages/receiver/${_id}?page=${page}&limit=25`,
    onSuccess: onReceiveData,
    enabled: !!conversation?.status,
    enableId: conversation?.conversation?._id,
  });

  const isSenderSame = (prev, curr) => {
    return prev?.fromSelf === curr?.fromSelf;
  };
  const isDateSame = (prev, curr) => {
    return moment(prev?.createdAt).day() === moment(curr?.createdAt).day();
  };

  const renderMessage = useCallback(
    ({ item, index }) => {
      if (!item.fromSelf) {
        return (
          <MessReceivedItem
            avatar={avatar}
            item={item}
            senderSame={isSenderSame(item, messages[index - 1])}
            dateSame={isDateSame(messages[index + 1], item)}
            isFirstComment={index === messages.length}
            date={moment(item.createdAt).format("LLL")}
          />
        );
      } else {
        return (
          <MessSentItem
            item={item}
            dateSame={isDateSame(messages[index + 1], item)}
            isFirstComment={index === messages.length}
            date={moment(item.createdAt).format("LLL")}
          />
        );
      }
    },
    [isSenderSame, messages]
  );
  const keyExtractor = useCallback((item) => item._id, []);
  const getItemLayout = useCallback((messages, index) => {
    return { length: 100, offset: 100 * index, index };
  }, []);

  const { mutate: sendMessage } = usePost({
    uri: `/users/${user?._id}/messages`,
    onSuccess: (res) => {
      setMessages((messages) => [{ ...res.data, fromSelf: true }, ...messages]);
    },
    config: {
      enabled: !!conversation?.status,
    },
  });

  const { mutate: createConversation } = usePost({
    uri: `/conversations`,
    onSuccess: (res) => {
      sendMessage({
        message: { text: message },
        receiver: _id,
        conversation: res.data._id,
      });
      refetchIsConversation();
    },
  });

  const onSendMessage = () => {
    setMessage("");

    if (!conversation?.status) {
      createConversation({ participants: [user?._id, _id] });
    } else {
      sendMessage({
        message: { text: message },
        receiver: _id,
        conversation: conversation?.conversation?._id,
      });
    }
  };

  const header = (
    <>
      {isLoading && isRefetching && <Spinner sx={{ marginVertical: 25 }} />}
      <CardMessageUser
        sx={!messages.length && { marginBottom: 375 }}
        name={name}
        username={username}
        avatar={avatar}
        followersCount={followersCount}
        followingsCount={followingsCount}
      />
    </>
  );

  const onEndReach = useCallback(() => {
    if (hasNext) setPage(page + 1);
  }, [hasNext, page]);

  const handleOpenCamera = () => {
    if (permission.granted) {
      navigation.navigate("Camera", { name, avatar });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderMessageItem
        userId={_id}
        name={name}
        username={username}
        avatar={avatar}
        checkmark={checkmark}
      />
      <Divider color="#ddd" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
        keyboardVerticalOffset={10}
      >
        <FlatList
          inverted
          ListFooterComponent={header}
          initialScrollIndex={0}
          getItemLayout={getItemLayout}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.flatList}
          onEndReached={onEndReach}
          onEndReachedThreshold={0}
        />
        <FooterMessageItem
          message={message}
          onOpenCamera={handleOpenCamera}
          onSendMessage={onSendMessage}
          onChangeText={(text) => setMessage(text)}
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
  flatList: {
    padding: 15,
  },
});
