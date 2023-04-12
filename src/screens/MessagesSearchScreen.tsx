import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Header, SearchBarInput, Stack } from "../components/core";
import { useNavigation } from "@react-navigation/native";

export const MessagesSearchScreen = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" sx={{ marginHorizontal: 15 }}>
        <SearchBarInput
          value={search}
          onChangeText={() => {}}
          placeholder="Cauta"
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Anuleaza</Text>
        </Pressable>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
