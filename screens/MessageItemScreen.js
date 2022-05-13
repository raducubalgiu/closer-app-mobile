import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderMessageItem from "../components/customized/Layout/Headers/HeaderMessageItem";
import { useAuth } from "../hooks/auth";
import axios from "axios";
import { Stack, Button } from "../components/core";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import theme from "../assets/styles/theme";
import MessReceivedItem from "../components/customized/ListItems/MessReceivedItem";
import MessSentItem from "../components/customized/ListItems/MessSentItem";
import { Icon } from "@rneui/base";

const MessageItemScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { userId, name, username, avatar, socket } = props.route.params;

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

  const handleSendMessage = () => {
    axios
      .post(
        `${process.env.BASE_ENDPOINT}/messages/add-message`,
        {
          from: user?._id,
          to: userId,
          message,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() => {
        Keyboard.dismiss();
        socket.current.emit("send-msg", {
          to: userId,
          from: user?._id,
          message,
        });
        setMessages((messages) => messages.concat({ fromSelf: true, message }));
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {}, []);

  const renderItem = ({ item }) => {
    if (item.fromSelf) {
      return <MessSentItem message={item?.message} />;
    } else {
      return <MessReceivedItem avatar={avatar} message={item?.message} />;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderMessageItem name={name} username={username} avatar={avatar} />
      <KeyboardAvoidingView
        style={{ justifyContent: "space-between", flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          contentContainerStyle={{ margin: 15 }}
          keyExtractor={() => uuidv4()}
          data={messages}
          renderItem={renderItem}
        />
        <Stack direction="row" sx={styles.inputContainer}>
          <Stack direction="row" justify="start" sx={{ flex: 1 }}>
            <Button onPress={() => {}}>
              <Icon name="camera" type="feather" />
            </Button>
            <TextInput
              onChangeText={(text) => setMessage(text)}
              value={message}
              style={styles.input}
              placeholder="Trimite mesaj"
            />
          </Stack>
          <Button onPress={handleSendMessage}>
            <Text style={styles.sendBtnText}>Trimite</Text>
          </Button>
        </Stack>
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
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 12.5,
  },
  input: { flex: 1, marginLeft: 10 },
  sendBtnText: {
    fontFamily: "Exo-Bold",
    color: theme.lightColors.primary,
  },
});
