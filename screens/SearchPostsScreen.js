import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import { CardRecentSearch } from "../components/customized";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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

  const renderRecent = ({ item }) => (
    <CardRecentSearch onPress={() => {}} word={item?.word} />
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
            updateValue={updateSearch}
            cancelButtonTitle={t("search")}
            onPress={() => navigation.navigate("SearchAll", { search })}
            height={60}
          />
        </Stack>
        <View>
          <Text style={styles.heading}>{t("recentSearch")}</Text>
          <FlatList
            data={RECENT_SEARCH}
            keyExtractor={(item) => item._id}
            renderItem={renderRecent}
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
});
