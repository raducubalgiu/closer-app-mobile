import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useHttpGet } from "../../../../hooks";
import theme from "../../../../assets/styles/theme";
import { FlatList } from "react-native-gesture-handler";
import { CardFollowers } from "../../Cards/CardFollowers";
import { Stack } from "../../../core";

const { black } = theme.lightColors;

export const SearchPopularTab = ({ search }) => {
  const { data: users, loading } = useHttpGet(
    `/users/search?search=${search}&page=1&limit=3`
  );

  const headerUsers = useCallback(
    () => (
      <Stack align="start" sx={{ marginVertical: 20 }}>
        <Text style={{ fontFamily: "Exo-Bold", color: black, fontSize: 15.5 }}>
          Utilizatori
        </Text>
      </Stack>
    ),
    []
  );

  const renderUsers = useCallback(
    ({ item }) => (
      <CardFollowers
        avatar={item.avatar}
        followeeId={item._id}
        username={item.username}
        name={item.name}
        counter={item.counter}
        checkmark={item.checkmark}
      />
    ),
    []
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUsers}
        ListHeaderComponent={headerUsers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
