import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, Icon } from "react-native-elements";
import { Colors } from "../../../../assets/styles/Colors";
import axios from "axios";
import { useAuth } from "../../../../context/auth";

const { width } = Dimensions.get("window");

const AllSavedTab = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/bookmarks`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setBookmarks(res.data.bookmarks))
      .catch((err) => console.log(err));
  }, []);

  console.log(bookmarks);

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        numColumns={3}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.box}>
            <View style={{ position: "relative" }}>
              <Image
                containerStyle={styles.image}
                source={{ uri: item?.post?.images[0]?.url }}
              />
              {item?.post?.bookable && (
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
