import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Image, Icon } from "@rneui/themed";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CompleteProfile from "../../../components/customized/CompleteProfile/CompleteProfile";
import NoFoundPosts from "../../../components/customized/NotFoundContent/NoFoundPosts";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../context/auth";

const { width } = Dimensions.get("window");

const PostsProfileScreen = (props) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${props.userId}/get-posts`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, [props.userId]);

  let noFoundPosts;
  if (posts.length === 0 && user?._id === props.userId) {
    noFoundPosts = <NoFoundPosts />;
  }

  return (
    <FlatList
      ListHeaderComponent={noFoundPosts}
      style={{ backgroundColor: "white" }}
      bounces={false}
      showsVerticalScrollIndicator={false}
      data={posts}
      numColumns={3}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Products")}
        >
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
            {item?.fixed && (
              <View style={styles.fixed}>
                <Text style={styles.fixedText}>Fixat</Text>
              </View>
            )}
            {!item?.fixed && item?.postType === "video" && (
              <View style={styles.type}>
                <Icon
                  name="video"
                  type="feather"
                  color="white"
                  size={20}
                  style={{ marginLeft: 5 }}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      ListFooterComponent={<CompleteProfile />}
    />
  );
};

export default PostsProfileScreen;

const styles = StyleSheet.create({
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
    color: theme.lightColors.black,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
  },
});
