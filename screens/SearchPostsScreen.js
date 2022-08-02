import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Divider, Icon } from "@rneui/themed";
import {
  Button,
  Checkmark,
  CustomAvatar,
  Feedback,
  IconButton,
} from "../components/core";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import { CardRecentSearch } from "../components/customized";
import theme from "../assets/styles/theme";
import { useAuth, useHttpGet } from "../hooks";
import { trimFunc } from "../utils";

const { grey0, primary, black } = theme.lightColors;

const SearchPostsScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [words, setWords] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  useHttpGet(`/users/${user?._id}/searches/searched-word`, (data) =>
    setWords(data)
  );
  const { data: searchedUsers } = useHttpGet(
    `/users/${user?._id}/searches/searched-user`
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
      .delete(`${process.env.BASE_ENDPOINT}/searches/${searchId}`)
      .then(() =>
        setWords((searches) => searches.filter((s) => s._id !== searchId))
      )
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

  const renderRecent = useCallback(
    ({ item }) => (
      <CardRecentSearch
        onDelete={() => deleteSearch(item._id)}
        onPress={() => {}}
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
    const { name, username, avatar } = item.searchedUser;

    return (
      <Stack sx={{ marginRight: 10 }}>
        <CustomAvatar avatar={avatar} sx={{ marginBottom: 5 }} />
        <Text style={{ fontFamily: "Exo-Medium" }}>{trimFunc(name, 10)}</Text>
        <Text style={{ fontSize: 13, color: grey0 }}>
          @{trimFunc(username, 10)}
        </Text>
      </Stack>
    );
  }, []);

  const header = (
    <View>
      <Stack direction="row" sx={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", color: black, fontSize: 17 }}>
          {t("recentSearch")}
        </Text>
        <IconButton
          iconName="close"
          color="white"
          size={20}
          sx={{ backgroundColor: "#ccc", borderRadius: 50, padding: 2.5 }}
        />
      </Stack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={searchedUsers}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ marginVertical: 20 }}
        renderItem={renderSearchedUsers}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Stack direction="row" justify="start">
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
          />
        )}
        {users.length === 0 && (
          <FlatList
            ListHeaderComponent={header}
            data={words}
            keyExtractor={(item) => item._id}
            renderItem={renderRecent}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
    fontFamily: "Exo-SemiBold",
    marginVertical: 10,
    fontSize: 13.5,
  },
  searchItem: {
    marginTop: 15,
  },
  username: {
    fontFamily: "Exo-SemiBold",
    marginRight: 5,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: grey0,
  },
  searchAll: {
    fontFamily: "Exo-Bold",
    color: primary,
    marginLeft: 5,
  },
  cancelBtnText: {
    fontFamily: "Exo-Bold",
    color: primary,
    backgroundColor: "white",
    padding: 2.5,
  },
});
