import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { SearchBarInput, Stack } from "../components/core";
import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import theme from "../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const RECENT_SEARCH = [
  { _id: "1", word: "Patrice Evra" },
  { _id: "2", word: "Cristiano Ronaldo" },
  { _id: "3", word: "jamie carlin" },
];

const SearchPostsScreen = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Stack direction="row" justify="start">
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color={theme.lightColors.black}
              size={22.5}
            />
          </TouchableOpacity>
          <SearchBarInput
            autoFocus={true}
            placeholder={t("search")}
            value={search}
            updateValue={updateSearch}
            cancelButtonTitle={t("search")}
            onPress={() => navigation.navigate("SearchAll", { search })}
          />
        </Stack>
        <View>
          <Text style={styles.heading}>{t("recentSearch")}</Text>
          <FlatList
            data={RECENT_SEARCH}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("SearchAll", { search })}
              >
                <Stack direction="row" justify="start">
                  <Icon
                    name="search"
                    type="feather"
                    color={theme.lightColors.grey0}
                    size={17.5}
                  />
                  <Text style={styles.searchItem}>{item.word}</Text>
                </Stack>
              </TouchableOpacity>
            )}
          />
        </View>
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
  item: {
    paddingVertical: 10,
  },
  searchItem: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    marginLeft: 10,
  },
});
