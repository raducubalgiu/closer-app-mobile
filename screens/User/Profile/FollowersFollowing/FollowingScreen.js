import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import React from "react";
import CardFollowers from "../../../../components/customized/Cards/CardFollowers";

const USERS = [
  {
    _id: "1",
    username: "raducu__balgiu",
    name: "Raducu Balgiu",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    _id: "2",
    username: "cristiana_dragomir",
    name: "Cristiana Dragomir",
    avatar:
      "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
  },
  {
    _id: "3",
    username: "ionela_constantin",
    name: "Ionela Constantin",
    avatar:
      "https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg",
  },
  {
    _id: "4",
    username: "cristiana_dumitrache",
    name: "Cristiana Dumitrache",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    _id: "5",
    username: "gindac_mihai",
    name: "Gindac Mihai",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
  },
  {
    _id: "6",
    username: "oprea_laurentiu",
    name: "Oprea Laurentiu",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
  },
  {
    _id: "7",
    username: "random_user",
    name: "Random User",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
  },
];

const FollowingScreen = () => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={USERS}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardFollowers
            onPress={() => {}}
            avatar={item?.avatar}
            username={item?.username}
            name={item?.name}
          />
        )}
      />
    </View>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
