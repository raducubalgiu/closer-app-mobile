import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { Button, Checkmark, CustomAvatar, Feedback } from "../components/core";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import { CardRecentSearch } from "../components/customized";
import theme from "../assets/styles/theme";
import { useAuth } from "../hooks";

const { grey0, primary, black } = theme.lightColors;
const RECENT_SEARCH = [
  { _id: "1", word: "Patrice Evra" },
  { _id: "2", word: "Cristiano Ronaldo" },
  { _id: "3", word: "jamie carlin" },
];

const SearchPostsScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

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

  const renderRecent = useCallback(
    ({ item }) => <CardRecentSearch onPress={() => {}} word={item?.word} />,
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

  const header = <Text style={styles.heading}>{t("recentSearch")}</Text>;

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
          <Button onPress={goToSearchAll}>
            <Text style={styles.cancelBtnText}>{t("search")}</Text>
          </Button>
        </Stack>
        <Feedback feedback={feedback} setFeedback={setFeedback} />
        <FlatList
          ListHeaderComponent={!users.length && header}
          data={users.length ? users : RECENT_SEARCH}
          keyExtractor={(item) => item._id}
          renderItem={users.length ? renderUsers : renderRecent}
          ListFooterComponent={users.length && footer}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
        />
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
    fontSize: 13.5,
    fontFamily: "Exo-Bold",
    color: black,
    backgroundColor: "white",
    padding: 5,
  },
});
