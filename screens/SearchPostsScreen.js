import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import {
  Button,
  Checkmark,
  CustomAvatar,
  IconBackButton,
  SearchBarInput,
  Stack,
} from "../components/core";
import { CardRecentSearch } from "../components/customized";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import theme from "../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { useAuth } from "../hooks";

const RECENT_SEARCH = [
  { _id: "1", word: "Patrice Evra" },
  { _id: "2", word: "Cristiano Ronaldo" },
  { _id: "3", word: "jamie carlin" },
];

const SearchPostsScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateSearch = (search) => {
    setSearch(search);

    if (search) {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/search?search=${search}`)
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((err) => console.log(err));
    } else {
      setUsers([]);
    }
  };

  const goToUser = (userId) => {
    navigation.navigate("ProfileGeneral", { userId });
  };

  const renderRecent = ({ item }) => (
    <CardRecentSearch onPress={() => {}} word={item?.word} />
  );

  const renderUsers = ({ item }) => (
    <Button onPress={() => goToUser(item?._id)}>
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
  );

  const header = <Text style={styles.heading}>{t("recentSearch")}</Text>;

  const footer = (
    <Button sx={{ marginTop: 30 }}>
      <Stack direction="row" align="center" justify="center">
        <Icon name="search" type="feather" color={theme.lightColors.primary} />
        <Button onPress={() => navigation.navigate("SearchAll", { search })}>
          <Text style={styles.searchAll}>{t("seeAllResults")}</Text>
        </Button>
      </Stack>
    </Button>
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
            cancelButtonTitle={t("search")}
            onCancel={() => navigation.navigate("SearchAll", { search })}
            height={60}
          />
        </Stack>
        <FlatList
          ListHeaderComponent={users.length === 0 && header}
          data={users.length > 0 ? users : RECENT_SEARCH}
          keyExtractor={(item) => item._id}
          renderItem={users.length > 0 ? renderUsers : renderRecent}
          ListFooterComponent={users.length > 0 && footer}
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
    color: theme.lightColors.grey0,
  },
  searchAll: {
    fontFamily: "Exo-Bold",
    color: theme.lightColors.primary,
    marginLeft: 5,
  },
});
