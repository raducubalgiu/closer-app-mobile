import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import MessageItem from "../../ListItems/MessageItem";
import SearchBarInput from "../../../core/Inputs/SearchBarInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../../../../context/auth";

const MessagesTab = () => {
  const socket = useRef();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", user?._id);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users`)
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  console.log(users);

  return (
    <View style={styles.screen}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <SearchBarInput
            showCancel={false}
            placeholder="Cauta"
            value={search}
            updateValue={updateSearch}
          />
        }
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <MessageItem
            onPress={() =>
              navigation.navigate("MessageItem", {
                userId: item?._id,
                name: item?.name,
                username: item?.username,
                avatar: item?.avatar[0]?.url,
                socket,
              })
            }
            name={item?.name}
            avatar={item?.avatar[0]?.url}
            checkmark={false}
            message={"Hello World"}
            date={"15s"}
          />
        )}
      />
    </View>
  );
};

export default MessagesTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
