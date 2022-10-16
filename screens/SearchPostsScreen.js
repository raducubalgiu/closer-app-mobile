import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Icon } from "@rneui/themed";
import {
  Button,
  Checkmark,
  CustomAvatar,
  Feedback,
  IconButton,
} from "../components/core";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import { RecentSearchListItem } from "../components/customized";
import theme from "../assets/styles/theme";
import { useAuth, useHttpDelete, useHttpGet } from "../hooks";
import { trimFunc } from "../utils";

const { grey0, primary, black } = theme.lightColors;

const SearchPostsScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [words, setWords] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  useHttpGet(`/users/${user?._id}/searches/searched-word`, (data) =>
    setWords(data)
  );
  useHttpGet(`/users/${user?._id}/searches/searched-user`, (data) => {
    setSearchedUsers(data);
  });

  const deleteHistory = () => {
    setWords([]);
    setSearchedUsers([]);
  };
  const { makeDelete } = useHttpDelete(
    `/users/${user?._id}/searches`,
    deleteHistory
  );

  const updateSearch = useCallback(
    (search) => {
      const controller = new AbortController();
      setSearch(search);

      if (search) {
        axios
          .get(
            `${process.env.BASE_ENDPOINT}/users/search?search=${search}&page=1&limit=10`,
            {
              signal: controller.signal,
              headers: { Authorization: `Bearer ${user.token}` },
            }
          )
          .then((res) => setUsers(res.data))
          .catch(() =>
            setFeedback({ visible: true, message: t("somethingWentWrong") })
          );
      } else {
        setUsers([]);
      }

      return () => {
        controller.abort();
      };
    },
    [search]
  );

  const deleteSearch = (searchId) => {
    axios
      .delete(`${process.env.BASE_ENDPOINT}/searches/${searchId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() =>
        setWords((searches) => searches.filter((s) => s._id !== searchId))
      )
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

  const renderRecent = useCallback(
    ({ item }) => (
      <RecentSearchListItem
        onDelete={() => deleteSearch(item._id)}
        onPress={() => navigation.navigate("SearchAll", { search: item.word })}
        word={item?.word}
      />
    ),
    []
  );

  const goToUser = (item) => {
    const { _id, username, avatar, name, checkmark } = item;

    navigation.navigate("ProfileGeneral", {
      userId: _id,
      username,
      avatar,
      name,
      checkmark,
      searchedUser: { _id, name, username, avatar },
    });
  };

  const renderUsers = useCallback(
    ({ item }) => (
      <Button onPress={() => goToUser(item)}>
        <Stack direction="row" justify="start" sx={styles.searchItem}>
          <CustomAvatar avatar={item?.avatar} />
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.username}>{item.username}</Text>
              {item.checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.name}>{item.name}</Text>
          </Stack>
        </Stack>
      </Button>
    ),
    []
  );

  const goToSearchAll = useCallback(() => {
    if (search.length === 0) return;
    navigation.navigate("SearchAll", { search });
  }, [search]);

  const footer = useCallback(
    () => (
      <Button sx={{ marginTop: 30 }}>
        <Stack direction="row" align="center" justify="center">
          <Icon name="search" type="feather" color={primary} />
          <Button onPress={goToSearchAll}>
            <Text style={styles.searchAll}>{t("seeAllResults")}</Text>
          </Button>
        </Stack>
      </Button>
    ),
    [search]
  );

  const renderSearchedUsers = useCallback(({ item }) => {
    const { username, avatar } = item?.searchedUser || {};

    return (
      <Button onPress={() => goToUser(item.searchedUser)}>
        <Stack sx={{ marginRight: 10, minWidth: 80 }}>
          <CustomAvatar size={70} avatar={avatar} sx={{ marginBottom: 5 }} />
          <Text style={{ fontSize: 13 }}>{trimFunc(username, 15)}</Text>
        </Stack>
      </Button>
    );
  }, []);

  const header = (
    <View>
      <Stack direction="row" sx={{ marginVertical: 10, paddingHorizontal: 15 }}>
        <Text style={{ fontWeight: "bold", color: black, fontSize: 17 }}>
          {t("recentSearch")}
        </Text>
        <IconButton
          iconName="close"
          color="white"
          size={17}
          sx={{ backgroundColor: "#ddd", borderRadius: 50, padding: 3 }}
          onPress={() => makeDelete()}
        />
      </Stack>
      {searchedUsers.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={searchedUsers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ marginVertical: 15, paddingHorizontal: 15 }}
          renderItem={renderSearchedUsers}
          keyboardShouldPersistTaps={"handled"}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start" sx={{ paddingHorizontal: 15 }}>
        <IconBackButton sx={{ marginRight: 10 }} />
        <SearchBarInput
          autoFocus={true}
          placeholder={t("search")}
          value={search}
          onChangeText={updateSearch}
          showCancel={false}
          onCancel={goToSearchAll}
          height={60}
        />
        <Button onPress={goToSearchAll} sx={{ marginLeft: 10 }}>
          <Text style={styles.cancelBtnText}>{t("search")}</Text>
        </Button>
      </Stack>
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      {users.length > 0 && (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderUsers}
          ListFooterComponent={users.length && footer}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        />
      )}
      {!users.length && !search && (
        <FlatList
          ListHeaderComponent={header}
          data={words}
          keyExtractor={(item) => item._id}
          renderItem={renderRecent}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchPostsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    textTransform: "uppercase",
    marginVertical: 10,
    fontSize: 13.5,
  },
  searchItem: {
    marginTop: 15,
  },
  username: {
    marginRight: 5,
  },
  name: {
    color: grey0,
  },
  searchAll: {
    color: primary,
    marginLeft: 5,
  },
  cancelBtnText: {
    color: primary,
    backgroundColor: "white",
    padding: 2.5,
  },
});
