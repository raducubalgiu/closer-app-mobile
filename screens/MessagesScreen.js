import {
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/auth";
import { MessageItem } from "../components/customized";
import {
  SearchBarInput,
  Header,
  SwipableItem,
  Spinner,
  IconButtonEdit,
} from "../components/core";
import { useTranslation } from "react-i18next";

const MessagesScreen = () => {
  const socket = useRef();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", user?._id);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/users`)
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header
          title={t("myMessages")}
          actionBtn={<IconButtonEdit onPress={() => {}} />}
          hideBtnLeft={true}
        />
        {loading && <Spinner />}
        {/* {!loading && (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <SearchBarInput
                showCancel={false}
                placeholder={t("search")}
                value={search}
                updateValue={updateSearch}
              />
            }
            showsVerticalScrollIndicator={false}
            data={users}
            keyExtractor={(item) => item?._id}
            renderItem={renderMessages}
          />
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tabBarStyle: {
    fontFamily: "Exo-SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
  },
});
