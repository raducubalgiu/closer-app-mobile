import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import {
  Header,
  SearchBarInput,
  Heading,
  Spinner,
} from "../../../components/core";
import { useAuth } from "../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

export const MessageNewScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("newMessage")} />
      </SafeAreaView>
      <View style={styles.searchbar}>
        <SearchBarInput
          placeholder={t("search")}
          value={search}
          onChangeText={updateSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  searchbar: { height: 50, marginHorizontal: 15 },
});
