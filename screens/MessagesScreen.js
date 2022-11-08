import {
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { MessageListItem, UserListItemSimple } from "../components/customized";
import theme from "../assets/styles/theme";
import { useAuth, useGet } from "../hooks";
import {
  SearchBarInput,
  Header,
  IconButtonEdit,
  Stack,
  Heading,
} from "../components/core";

const { grey0, black } = theme.lightColors;

const messages = [
  {
    _id: "1",
    name: "Raducu Balgiu",
    username: "raducubalgiu",
    avatar: [],
    checkmark: false,
    message: "Hey dude, can i take your time to respond to my question?",
    date: "23 ian",
    followersCount: 100,
    followingsCount: 50,
  },
  {
    _id: "2",
    name: "Mihai Gindac",
    username: "raducubalgiu",
    avatar: [],
    checkmark: false,
    message: "Ce tare a fost la mare",
    date: "23 ian",
    followersCount: 1,
    followingsCount: 21,
  },
  {
    _id: "3",
    name: "Oprea Laurentiu",
    username: "raducubalgiu",
    avatar: [],
    checkmark: false,
    message: "Salut Radu",
    date: "23 ian",
    followersCount: 10,
    followingsCount: 25,
  },
];

export const MessagesScreen = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: suggestedUsers } = useGet({
    model: "users",
    uri: `/users/${user?._id}/followings?page=1&limit=20`,
  });

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
    <MessageListItem
      onPress={() => navigation.navigate("MessageItem", { item })}
      avatar={item.avatar}
      name={item.name}
      checkmark={item.checkmark}
      message={item.message}
      date={item.date}
    />
  ));

  const header = (
    <>
      {messages.length === 0 && (
        <Stack sx={{ paddingVertical: 15 }}>
          <Text style={{ color: grey0 }}>{t("noFoundMessage")}</Text>
        </Stack>
      )}
      <Divider />
      <Heading title={t("following")} />
    </>
  );

  const renderSuggestedUser = useCallback(
    ({ item }) => (
      <UserListItemSimple
        avatar={item.avatar}
        followeeId={item._id}
        profession={item.username}
        name={item.name}
        checkmark={item.checkmark}
        onGoToUser={() => navigation.navigate("MessageItem", { item })}
      />
    ),
    []
  );

  const footer = (
    <FlatList
      ListHeaderComponent={header}
      data={suggestedUsers?.results}
      renderItem={renderSuggestedUser}
      keyExtractor={useCallback((item) => item?._id, [])}
    />
  );

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header
          title={t("myMessages")}
          hideBtnLeft={true}
          actionBtn={
            <IconButtonEdit onPress={() => navigation.navigate("MessageNew")} />
          }
        />
        <View style={{ height: 50 }}>
          <SearchBarInput
            showCancel={false}
            placeholder={t("search")}
            value={search}
            updateValue={updateSearch}
          />
        </View>
        <FlatList
          refreshControl={refreshControl}
          ListHeaderComponent={<Heading title={t("messages")} />}
          showsVerticalScrollIndicator={false}
          data={messages}
          keyExtractor={useCallback((item) => item?._id, [])}
          renderItem={renderMessages}
          ListFooterComponent={footer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
