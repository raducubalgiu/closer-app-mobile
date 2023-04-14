import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import { Divider } from "@rneui/themed";
import { Camera } from "expo-camera";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../../navigation/rootStackParams";
import theme from "../../../../assets/styles/theme";
import { usePost, useAuth, useGet } from "../../../hooks";
import { Message, MessageContent, User } from "../../../ts";
import { showToast } from "../../../utils";
import {
  SheetModal,
  Spinner,
  Stack,
  CustomAvatar,
} from "../../../components/core";
import {
  FooterMessageItem,
  HeaderMessageItem,
  MediaLibrarySheet,
  MessSentItem,
  MessReceivedItem,
} from "../../../components/customized";

const { grey0 } = theme.lightColors || {};

const ENDPOINT = "http://192.168.100.2:8000";
let socket: any;

type IProps = NativeStackScreenProps<RootStackParams, "Messages">;
type MessageResponse = { next: number | null; results: Message[] | [] };

export const MessagesScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { chat } = route.params;
  const { t } = useTranslation();
  const [permission] = Camera.useCameraPermissions();
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasNext, setHasNext] = useState<null | number | undefined>(null);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTypingUser, setIsTypingUser] = useState<User | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { height } = useWindowDimensions();
  const snapPoints = useMemo(() => [1, height / 1.1], []);
  const sheetRef = useRef<BottomSheetModal>(null);

  const { isPreviousData, isInitialLoading, isRefetching } =
    useGet<MessageResponse>({
      model: "messages",
      uri: `/users/${user?.id}/chats/${chat?.id}/messages?page=${page}&limit=20`,
      options: {
        onSuccess(response) {
          if (response.data) {
            setHasNext(response?.data?.next);
            setMessages((messages) =>
              messages?.concat(response?.data?.results)
            );
          }
        },
        keepPreviousData: true,
        enabled: !!chat?.id,
      },
    });

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("join chat", chat?.id);
    socket.on("typing", (user: User) => setIsTypingUser(user));
    socket.on("stop typing", () => setIsTypingUser(null));
  }, []);

  useEffect(() => {
    socket.on("message received", (messageReceived: Message) => {
      setMessages([messageReceived, ...messages]);
    });
  });

  const { mutate } = usePost({
    uri: `/users/${user?.id}/chats/${chat?.id}/messages`,
    onSuccess: (response) => {
      socket.emit("new message", response.data);
    },
    onError: () => showToast({ message: t("theMessageCouldNotBeSent") }),
  });

  const onSendMessage = (newMess: { content: MessageContent }) => {
    if (message.length > 0) {
      socket.emit("stop typing", chat?.id);
      setMessage("");
      setMessages([
        {
          id: "",
          sender: user,
          content: newMess.content,
          chatId: chat?.id,
          createdAt: dayjs().format(),
          liked: false,
          seenBy: [],
        },
        ...messages,
      ]);
      mutate({ content: { text: message } });
    }
  };

  const typingHandler = (text: string) => {
    setMessage(text);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chat?.id, user);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 10000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chat?.id);
        setTyping(false);
      }
    }, timerLength);
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
      const isSent = user?.id === item?.sender?.id;
      switch (isSent) {
        case true:
          return (
            <MessSentItem item={item} dateSame={true} date={item.createdAt} />
          );
        case false:
          return (
            <MessReceivedItem
              avatar={item?.sender?.avatar}
              item={item}
              senderSame={isSenderSame(item, messages[index - 1])}
              dateSame={true}
              date={item?.createdAt}
            />
          );
      }
    },
    []
  );

  let header = (
    <>
      {isTypingUser && (
        <Stack direction="row" justify="start" sx={{ margin: 15 }}>
          <CustomAvatar size={30} avatar={isTypingUser?.avatar} />
          <Text style={{ marginLeft: 10, color: grey0 }}>Scrie...</Text>
        </Stack>
      )}
    </>
  );

  const keyExtractor = useCallback(
    (_: Message, index: number) => index.toString(),
    []
  );

  const loadMore = () => {
    if (!!hasNext && !isPreviousData) {
      setPage((page) => page + 1);
    }
  };

  const footer = isRefetching ? <Spinner sx={{ paddingVertical: 30 }} /> : null;

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderMessageItem chat={chat} />
      <Divider color="#ddd" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
        keyboardVerticalOffset={10}
      >
        {!isInitialLoading && (
          <FlashList
            inverted
            ListHeaderComponent={header}
            ListFooterComponent={footer}
            initialScrollIndex={0}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.flatList}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            estimatedItemSize={100}
          />
        )}
        {isInitialLoading && <Spinner />}
        <FooterMessageItem
          message={message}
          onOpenCamera={handleOpenCamera}
          onSendMessage={() => onSendMessage({ content: { text: message } })}
          onChangeText={typingHandler}
          onOpenMediaLibrary={() => {
            Keyboard.dismiss();
            sheetRef.current?.present();
          }}
          onAddEmojy={(emojy: string) =>
            setMessage((message) => message.concat(emojy))
          }
        />
      </KeyboardAvoidingView>
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 300 }}
        showIndicator={false}
      >
        <MediaLibrarySheet
          onClose={() => sheetRef.current?.close()}
          selectMany
        />
      </SheetModal>
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
