import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderSheet from "../components/customized/Layout/Headers/HeaderSheet";
import { useNavigation } from "@react-navigation/native";
import { SearchBarInput } from "../components/core";
import { useTranslation } from "react-i18next";

export const MusicScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <HeaderSheet title="Music" onClose={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ height: 50 }}>
          <SearchBarInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder={t("search")}
            showCancel={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
