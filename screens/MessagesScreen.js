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
import {
  MessageListItem,
  UserListItem,
  UserListItemSimple,
} from "../components/customized";
import theme from "../assets/styles/theme";
import { useAuth, useGet, useGetPaginate } from "../hooks";
import {
  SearchBarInput,
  Header,
  IconButtonEdit,
  Stack,
  Heading,
} from "../components/core";

const { grey0 } = theme.lightColors;

export const MessagesScreen = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  const { data: suggestedUsers } = useGet({
    model: "users",
    uri: `/users/${user?._id}/followings?page=1&limit=20`,
  });

  const { data } = useGetPaginate({
    model: "conversations",
    uri: `/users/${user._id}/conversations`,
    limit: "20",
  });

  const { pages } = data || {};

  const renderMessages = useCallback(
    ({ item }) => (
      <MessageListItem
        onPress={() => navigation.navigate("MessageItem", { item })}
        conversation={item}
      />
    ),
    []
  );

  const header = (
    <>
      <Stack sx={{ paddingVertical: 15 }}>
        <Text style={{ color: grey0 }}>{t("noFoundMessage")}</Text>
      </Stack>
      <Divider />
      <Heading title={t("following")} />
    </>
  );

  const renderSuggestedUser = useCallback(
    ({ item }) => (
      <UserListItem
        user={item.user}
        isFollow={false}
        avatar={item.user.avatar}
      />
    ),
    []
  );

  const footer = (
    <FlatList
      ListHeaderComponent={header}
      data={suggestedUsers?.results}
      renderItem={renderSuggestedUser}
      keyExtractor={useCallback((item) => item?.user._id, [])}
    />
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
            updateValue={(text) => setSearch(text)}
          />
        </View>
        <FlatList
          refreshControl={refreshControl}
          ListHeaderComponent={<Heading title={t("messages")} />}
          showsVerticalScrollIndicator={false}
          data={pages?.map((page) => page.results).flat()}
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
