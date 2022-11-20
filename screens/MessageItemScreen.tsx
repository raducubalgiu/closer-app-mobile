import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Camera } from "expo-camera";
import { usePost, useAuth, useGet, useGetPaginate } from "../hooks";
import {
  FooterMessageItem,
  MessReceivedItem,
  MessSentItem,
  HeaderMessageItem,
} from "../components/customized";
import { Divider } from "@rneui/themed";
import { Spinner } from "../components/core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

export const MessageItemScreen = ({ route }) => {
  const { user } = useAuth();
  const [permission] = Camera.useCameraPermissions();
  const { _id, name, username, avatar, checkmark } = route.params?.item;
  const [message, setMessage] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: conversation, refetch: refetchConversation } = useGet({
    model: "isConversation",
    uri: `/users/${user?._id}/conversations/${_id}`,
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPaginate({
      model: "messages",
      uri: `/users/${user?._id}/messages/receiver/${_id}`,
      limit: "20",
      enabled: !!conversation?._id,
    });

  const { pages } = data || {};
  const messages = pages?.map((page) => page.results).flat() || [];

  const { mutate: sendMessage } = usePost({
    uri: `/users/${user?._id}/messages`,
  });

  const { mutate: createConversation } = usePost({
    uri: `/conversations`,
    onSuccess: (res) => {
      sendMessage({
        message: { text: message },
        receiver: _id,
        conversation: res.data._id,
      });
      refetchConversation();
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
        conversation: conversation?._id,
      });
    }
  };

  const handleOpenCamera = () => {
    if (permission.granted) {
      navigation.navigate("Camera", { name, avatar });
    }
  };

  const isSenderSame = (curr, prev) => {
    return curr?.fromSelf === prev?.fromSelf;
  };

  const renderMessage = useCallback(({ item, index }) => {
    if (!item?.fromSelf) {
      return (
        <MessReceivedItem
          avatar={avatar}
          item={item}
          senderSame={isSenderSame(item, messages[index - 1])}
          dateSame={true}
          date={item.createdAt}
        />
      );
    } else {
      return <MessSentItem item={item} dateSame={true} date={item.createdAt} />;
    }
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);
  const getItemLayout = useCallback((_, index) => {
    return { length: 100, offset: 100 * index, index };
  }, []);

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 25 }} />;
    } else {
      return null;
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
        conversationId={conversation?._id}
      />
      <Divider color="#ddd" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
        keyboardVerticalOffset={10}
      >
        <FlatList
          inverted
          ListFooterComponent={showSpinner}
          initialScrollIndex={0}
          getItemLayout={getItemLayout}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.flatList}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
        <FooterMessageItem
          message={message}
          onOpenCamera={handleOpenCamera}
          onSendMessage={onSendMessage}
          onChangeText={(text: string) => setMessage(text)}
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
    paddingVertical: 15,
  },
});
