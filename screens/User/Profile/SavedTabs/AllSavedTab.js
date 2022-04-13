import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image, Icon } from "react-native-elements";
import { Colors } from "../../../../assets/styles/Colors";

const { width } = Dimensions.get("window");

const posts = [
  {
    _id: "1",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648027783/c48rfzdl4tcbuxqp2nha.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "2",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648027783/nxtazwwg899znwbzfjoq.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "3",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648028044/q7gbcwsgythlqj4giie5.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "4",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648027974/oxejtfddf7dxfkcorpgx.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "5",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648027783/c48rfzdl4tcbuxqp2nha.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "6",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648027783/htczyledeq3njbwoc5zs.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "7",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648000102/qvpnowzxrs0mi6c34bz6.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "8",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1647999992/ycyqyukaxxtxvueojyto.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "8",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1647995137/n8roywsnnsrt0dassvgc.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "9",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1647994876/akzpbgqbviemnlwhrogl.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "10",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1647994565/c07fnrkpp8pszi1u9jkr.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "11",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1647994099/tkfh8qsom9fry9wg0n5p.jpg",
      },
    ],
    bookable: true,
  },
  {
    _id: "12",
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648028472/sttskm0dmzn4s19evbsp.jpg",
      },
    ],
    bookable: true,
  },
];

const AllSavedTab = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.box}>
            <View style={{ position: "relative" }}>
              <Image
                containerStyle={styles.image}
                source={{ uri: item?.images[0]?.url }}
              />
              {item?.bookable && (
                <View style={styles.bookable}>
                  <Icon
                    name="shopping"
                    type="material-community"
                    color="white"
                    size={20}
                    style={{ marginLeft: 5 }}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AllSavedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    width: width / 3,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
  },
  bookable: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
  },
  fixed: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    backgroundColor: "white",
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  fixedText: {
    fontFamily: "Exo-SemiBold",
    fontSize: 12,
    //textTransform: "uppercase",
    color: Colors.textDark,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
  },
});
