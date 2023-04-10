import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import { Camera } from "expo-camera";
import { usePost, useAuth, useGetPaginate, usePaginateActions } from "../hooks";
import {
  FooterMessageItem,
  MessReceivedItem,
  MessSentItem,
  HeaderMessageItem,
} from "../components/customized";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Message } from "../ts";

type IProps = NativeStackScreenProps<RootStackParams, "Messages">;

export const MessagesScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { chat } = route.params;
  const [permission] = Camera.useCameraPermissions();
  const [message, setMessage] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const options = useGetPaginate({
    model: "messages",
    uri: `/users/${user?.id}/chats/${chat?.id}/messages`,
    limit: "20",
    enabled: !!chat,
  });

  const { data: messages, loadMore, showSpinner } = usePaginateActions(options);

  const onSendMessage = () => {
    setMessage("");
  };

  const handleOpenCamera = () => {
    if (permission?.granted) {
      navigation.navigate("Camera", { name: user?.name, avatar: user?.avatar });
    }
  };

  const isSenderSame = (curr: Message, prev: Message) => {
    return curr?.sender?.id === prev?.sender?.id;
  };

  const renderMessage = useCallback(
    ({ item, index }: ListRenderItemInfo<Message>) => {
      const isSent = user?.id === item.sender.id;

      switch (true) {
        case isSent:
          return (
            <MessSentItem item={item} dateSame={true} date={item.createdAt} />
          );
        case !isSent:
          return (
            <MessReceivedItem
              avatar={[]}
              item={item}
              senderSame={isSenderSame(item, messages[index - 1])}
              dateSame={true}
              date={item.createdAt}
            />
          );
        default:
          return null;
      }
    },
    []
  );

  const keyExtractor = useCallback((item: Message) => item?.id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderMessageItem userId={user?.id} chat={chat} />
      <Divider color="#ddd" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
        keyboardVerticalOffset={10}
      >
        <FlashList
          inverted
          ListFooterComponent={showSpinner}
          initialScrollIndex={0}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.flatList}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          estimatedItemSize={100}
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
