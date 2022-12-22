import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { Checkmark, IconButton } from "../components/core";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import {
  HashtagListItem,
  RecentSearchListItem,
} from "../components/customized";
import theme from "../assets/styles/theme";
import { useAuth, useDelete, useGet } from "../hooks";
import { trimFunc } from "../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

const { grey0, primary, black } = theme.lightColors || {};

export const SearchPostsScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [words, setWords] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const updateSearch = useCallback(
    (search: string) => {
      const controller = new AbortController();
      setSearch(search);

      let endpoint = "";
      if (search.startsWith("#")) {
        const hash = search.split("#")[1];
        endpoint = `${process.env.BASE_ENDPOINT}/hashtags/search?search=${hash}&page=1&limit=5`;
      } else {
        endpoint = `${process.env.BASE_ENDPOINT}/users/search?search=${search}&page=1&limit=5`;
      }

      if (search) {
        axios
          .get(endpoint, {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${user?.token}` },
          })
          .then((res) => {
            setResults(res.data.results);
          })
          .catch(() => {});
      } else {
        setResults([]);
      }

      return () => {
        controller.abort();
      };
    },
    [search]
  );

  const deleteSearch = (searchId: string) => {
    axios
      .delete(`${process.env.BASE_ENDPOINT}/searches/${searchId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() =>
        setWords((searches) => searches.filter((s: any) => s._id !== searchId))
      )
      .catch(() => {});
  };

  const renderRecent = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <RecentSearchListItem
        onPress={() =>
          navigation.navigate("SearchAll", { search: item.word, screen: null })
        }
        word={item?.word}
      />
    ),
    []
  );

  const goToUser = (item: any) => {
    const { _id, username, avatar, name, checkmark } = item;

    navigation.navigate("ProfileGeneral", {
      userId: _id,
      username,
      avatar,
      name,
      checkmark,
      service: null,
      option: null,
    });
  };

  const renderResults = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      if (search.startsWith("#")) {
        return (
          <HashtagListItem
            name={item.name}
            postsCount={item.postsCount}
            onPress={() => navigation.navigate("Hashtag", { name: item.name })}
          />
        );
      } else {
        return (
          <Pressable onPress={() => goToUser(item)}>
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
          </Pressable>
        );
      }
    },
    [search]
  );

  const goToSearchAll = useCallback(() => {
    if (search.length === 0) return;
    navigation.navigate("SearchAll", {
      search: search.startsWith("#") ? search.split("#")[1] : search,
      screen: null,
    });
  }, [search]);

  const footer = (
    <Pressable style={{ marginTop: 30 }}>
      <Stack direction="row" align="center" justify="center">
        <Icon name="search" type="feather" color={primary} />
        <Pressable onPress={goToSearchAll}>
          <Text style={styles.searchAll}>{t("seeAllResults")}</Text>
        </Pressable>
      </Stack>
    </Pressable>
  );

  const word = (
    <Stack direction="row" justify="start" sx={{ margin: 15 }}>
      <Icon
        name="search"
        type="feather"
        size={25}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 15,
          borderRadius: 50,
        }}
      />
      <Text style={{ marginLeft: 10 }}>{search}</Text>
    </Stack>
  );

  const renderSearchedUsers = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      const { username, avatar } = item?.searchedUser || {};

      return (
        <Pressable onPress={() => goToUser(item.searchedUser)}>
          <Stack sx={{ marginRight: 10, minWidth: 80 }}>
            <CustomAvatar size={70} avatar={avatar} sx={{ marginBottom: 5 }} />
            <Text style={{ fontSize: 13 }}>{trimFunc(username, 15)}</Text>
          </Stack>
        </Pressable>
      );
    },
    []
  );

  const header = (
    <View>
      <Stack direction="row" sx={{ marginVertical: 10, paddingHorizontal: 15 }}>
        <Text style={{ fontWeight: "bold", color: black, fontSize: 17 }}>
          {t("recentSearch")}
        </Text>
        <IconButton
          name="close"
          type="material"
          color="white"
          size={17}
          sx={{ backgroundColor: "#ddd", borderRadius: 50, padding: 3 }}
          onPress={() => {}}
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
      <View>
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
          <Pressable onPress={goToSearchAll} style={{ marginLeft: 10 }}>
            <Text style={styles.cancelBtnText}>{t("search")}</Text>
          </Pressable>
        </Stack>
        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item._id}
            renderItem={renderResults}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        )}
        {results.length === 0 && !search && (
          <FlatList
            ListHeaderComponent={header}
            data={words}
            keyExtractor={(item) => item._id}
            renderItem={renderRecent}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
          />
        )}
        {results.length === 0 && search.length > 0 && word}
        {search.length > 0 && footer}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
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
    fontWeight: "500",
    fontSize: 15,
  },
  name: {
    color: grey0,
    fontSize: 15,
  },
  searchAll: {
    color: primary,
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 15,
  },
  cancelBtnText: {
    color: primary,
    backgroundColor: "white",
    padding: 2.5,
    fontWeight: "700",
  },
});
