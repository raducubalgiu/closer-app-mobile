import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { Image } from "@rneui/themed";
import { useHttpGet } from "../../../../hooks";
import theme from "../../../../assets/styles/theme";
import { CardFollowers } from "../../Cards/CardFollowers";
import { Spinner, Stack } from "../../../core";

const { black } = theme.lightColors;

const POPULAR_POSTS = [
  {
    _id: "1",
    description: "Lorem ipsum generator geloo world and this bla",
    hashtags: ["#haircut", "$postoftheday", "$ilovemyhair"],
    images: [
      "https://res.cloudinary.com/closer-app/image/upload/v1658162774/good-looking-hipster-young-bearded-man-visiting-hairstylist-barber-shop-barber-is-wearing-face-protective-mask-due-coronavirus_473712-4628_xfz0th.webp",
    ],
    bookable: false,
    postType: "post",
    likesCount: 200,
  },
];
const OPORTUNITIES = [];
const LAST_MINUTE = [
  {
    id: "1",
    images:
      "https://res.cloudinary.com/closer-app/image/upload/v1658162625/0_x22z5g.jpg",
    likesCount: 200,
  },
  {
    id: "2",
    images:
      "https://res.cloudinary.com/closer-app/image/upload/v1658162625/0_x22z5g.jpg",
    likesCount: 200,
  },
];

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
      {!loading && (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderUsers}
          ListHeaderComponent={headerUsers}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
