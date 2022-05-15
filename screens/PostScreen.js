import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
} from "react-native";
import { Header } from "../components/core";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../hooks";

const DUMMY_POSTS = [
  {
    _id: "1",
    bookable: false,
    commentsCount: 1,
    description: "Aici gasesti intotdeauna cele mai bune mancaruri",
    fixed: false,
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1652480287/raducu_loxt0z.jpg",
      },
    ],
    likesCount: 4,
    mentions: [],
    postType: "photo",
    user: {
      _id: "626a6910fe152cc1ba477e6f",
      avatar: [
        {
          url: "https://images.unsplash.com/photo-1538377557518-6d3de7a5777e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        },
      ],
      checkmark: false,
      counter: {
        followersCount: 1,
        followingCount: 1,
        ratingsAverage: 5,
        ratingsQuantity: 1,
      },
    },
  },
  {
    _id: "2",
    bookable: false,
    commentsCount: 1,
    description: "Some description for this #2 post",
    fixed: false,
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1652480287/raducu_loxt0z.jpg",
      },
    ],
    likesCount: 4,
    mentions: [],
    postType: "photo",
    user: {
      _id: "626a6910fe152cc1ba477e6f",
      avatar: [
        {
          url: "https://images.unsplash.com/photo-1538377557518-6d3de7a5777e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        },
      ],
      checkmark: false,
      counter: {
        followersCount: 1,
        followingCount: 1,
        ratingsAverage: 5,
        ratingsQuantity: 1,
      },
    },
  },
  {
    _id: "3",
    bookable: false,
    commentsCount: 1,
    description: "Some description for this #3 post",
    fixed: false,
    images: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1652480297/raducuu_hvxoeo.jpg",
      },
    ],
    likesCount: 4,
    mentions: [],
    postType: "photo",
    user: {
      _id: "626a6910fe152cc1ba477e6f",
      avatar: [
        {
          url: "https://images.unsplash.com/photo-1538377557518-6d3de7a5777e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        },
      ],
      checkmark: false,
      counter: {
        followersCount: 1,
        followingCount: 1,
        ratingsAverage: 5,
        ratingsQuantity: 1,
      },
    },
  },
];

const width = Dimensions.get("window").width;

const PostScreen = ({ route }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const { userId, postId } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-posts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setPosts(res.data.posts);
        })
        .catch((err) => console.log(err));
    }, [userId, user])
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Postari" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={DUMMY_POSTS}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <View style={{ width, paddingVertical: 15 }}>
            <Image
              containerStyle={styles.image}
              source={{ uri: `${item.images[0].url}` }}
            />
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 500,
  },
});
