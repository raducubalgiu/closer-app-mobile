import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Camera } from "expo-camera";
import { usePost, useAuth, useGet, useGetPaginate } from "../hooks";
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
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  // const { data: conversation, refetch: refetchIsConversation } = useGet({
  //   model: "isConversation",
  //   uri: `/users/${user?._id}/conversations/${_id}`,
  // });

  // const { isLoading, isRefetching } = useGet({
  //   model: "messages",
  //   uri: `/users/${user?._id}/messages/receiver/${_id}?page=${page}&limit=25`,
  //   onSuccess: onReceiveData,
  //   enabled: !!conversation?.status,
  //   enableId: conversation?.conversation?._id,
  // });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
    isPreviousData,
  } = useGetPaginate({
    model: "messages",
    uri: `/users/${user?._id}/messages/receiver/${_id}`,
    limit: "20",
  });

  // const isSenderSame = (prev, curr) => {
  //   return prev?.fromSelf === curr?.fromSelf;
  // };
  // const isDateSame = (curr, next) => {
  //   return (
  //     moment(curr?.createdAt).format("DD-MM-YYYY") ===
  //     moment(next?.createdAt).format("DD-MM-YYYY")
  //   );
  // };

  const renderMessage = useCallback(({ item, index }) => {
    //const dateSame = isDateSame(item, messages[index + 1]);

    if (!item?.fromSelf) {
      return (
        <MessReceivedItem
          avatar={avatar}
          item={item}
          senderSame={true}
          dateSame={true}
          date={moment(item?.createdAt).format("LLL")}
        />
      );
    } else {
      return (
        <MessSentItem
          item={item}
          dateSame={true}
          date={moment(item?.createdAt).format("LLL")}
        />
      );
    }
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);
  const getItemLayout = useCallback((messages, index) => {
    return { length: 100, offset: 100 * index, index };
  }, []);

  // const { mutate: sendMessage } = usePost({
  //   uri: `/users/${user?._id}/messages`,
  //   onSuccess: (res) => {
  //     setMessages((messages) => [{ ...res.data, fromSelf: true }, ...messages]);
  //   },
  //   config: {
  //     enabled: !!conversation?.status,
  //   },
  // });

  // const { mutate: createConversation } = usePost({
  //   uri: `/conversations`,
  //   onSuccess: (res) => {
  //     sendMessage({
  //       message: { text: message },
  //       receiver: _id,
  //       conversation: res.data._id,
  //     });
  //     refetchIsConversation();
  //   },
  // });

  // const onSendMessage = () => {
  //   setMessage("");

  //   if (!conversation?.status) {
  //     createConversation({ participants: [user?._id, _id] });
  //   } else {
  //     sendMessage({
  //       message: { text: message },
  //       receiver: _id,
  //       conversation: conversation?.conversation?._id,
  //     });
  //   }
  // };

  // const header = (
  //   <>
  //     {isLoading && isRefetching && <Spinner sx={{ marginVertical: 25 }} />}
  //     <CardMessageUser
  //       sx={!messages.length && { marginBottom: 375 }}
  //       name={name}
  //       username={username}
  //       avatar={avatar}
  //       followersCount={followersCount}
  //       followingsCount={followingsCount}
  //     />
  //   </>
  // );

  const handleOpenCamera = () => {
    if (permission.granted) {
      navigation.navigate("Camera", { name, avatar });
    }
  };

  const { pages } = data || {};

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
          data={pages?.map((page) => page.results).flat()}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.flatList}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
        />
        <FooterMessageItem
          message={message}
          onOpenCamera={handleOpenCamera}
          onSendMessage={() => {}}
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
