import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  View,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
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

const { height } = Dimensions.get("window");

export const MessageItemScreen = ({ route }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { userId, name, username, avatar, checkmark } = route.params?.item;
  const { followersCount, followingsCount } = route.params?.item;
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const onReceiveData = (res) => {
    setMessages((messages) => messages.concat(res.data.messages));
    setHasNext(res.data.hasNext);
  };

  const { isLoading, isRefetching, isFetching } = useGet({
    model: "messages",
    uri: `/users/${user?._id}/messages/receiver/${userId}?page=${page}&limit=25`,
    onSuccess: onReceiveData,
  });

  const isSenderSame = (prev, current) => {
    return prev?.fromSelf !== current?.fromSelf;
  };
  const isDateSame = (prev, current) => {
    return moment(prev?.createdAt).day() !== moment(current?.createdAt).day();
  };

  const renderMessage = useCallback(
    ({ item, index }) => {
      if (!item.fromSelf) {
        return (
          <MessReceivedItem
            avatar={avatar}
            item={item}
            displayAvatar={isSenderSame(item, messages[index - 1])}
            displayDate={isDateSame(item, messages[index + 1])}
            date={moment(item.createdAt).format("LLL")}
          />
        );
      } else {
        return (
          <MessSentItem
            item={item}
            displayDate={isDateSame(item, messages[index + 1])}
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
  });

  const onSendMessage = () => {
    setMessage("");
    sendMessage({
      message: { text: message },
      receiver: userId,
    });
  };

  const header = (
    <>
      {(isLoading || isRefetching) && <Spinner sx={{ marginVertical: 25 }} />}
      {!hasNext && !isLoading && !isFetching && (
        <CardMessageUser
          sx={!messages.length && { marginBottom: 400 }}
          name={name}
          username={username}
          avatar={avatar}
          followersCount={followersCount}
          followingsCount={followingsCount}
        />
      )}
    </>
  );

  const onEndReach = useCallback(() => {
    if (hasNext) setPage(page + 1);
  }, [hasNext, page]);

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
            removeClippedSubviews={true}
            maxToRenderPerBatch={15}
            initialNumToRender={15}
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
