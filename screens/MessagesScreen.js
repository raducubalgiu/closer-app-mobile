import {
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { MessageItem } from "../components/customized";
import { SearchBarInput, Header, IconButtonEdit } from "../components/core";
import { useTranslation } from "react-i18next";

const DUMMY_MESSAGES = [
  {
    _id: "1",
    name: "Raducu Balgiu",
    username: "raducubalgiu",
    avatar: [],
    checkmark: true,
    message: "Hey dude, can i take your time to respond to my question?",
    date: "23 ian",
  },
];

const MessagesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

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

  const renderMessages = useCallback(({ item }) => (
    <MessageItem
      onPress={() =>
        navigation.navigate("MessageItem", {
          userId: item._id,
          name: item.name,
          username: item.username,
          avatar: item.avatar,
          checkmark: item.checkmark,
        })
      }
      avatar={item.avatar}
      name={item.name}
      checkmark={item.checkmark}
      message={item.message}
      date={item.date}
    />
  ));
  const keyExtractor = useCallback((item) => item?._id, []);

  const header = (
    <SearchBarInput
      showCancel={false}
      placeholder={t("search")}
      value={search}
      updateValue={updateSearch}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header
          title={t("myMessages")}
          actionBtn={<IconButtonEdit onPress={() => {}} />}
          hideBtnLeft={true}
        />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={header}
          showsVerticalScrollIndicator={false}
          data={DUMMY_MESSAGES}
          keyExtractor={keyExtractor}
          renderItem={renderMessages}
        />
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
    textTransform: "capitalize",
    fontSize: 14,
  },
});
