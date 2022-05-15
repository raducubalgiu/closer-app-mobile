import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Image, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CompleteProfile from "../../CompleteProfile/CompleteProfile";
import NoFoundPosts from "../../NotFoundContent/NoFoundPosts";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";
import { Video, AVPlaybackStatus } from "expo-av";

const { width } = Dimensions.get("window");

export const PostsProfileTab = (props) => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { userId } = props;
  const navigation = useNavigation();
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-posts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          console.log("FETCH POSTS");
          setPosts(res.data.posts);
        })
        .catch((err) => console.log(err));
    }, [userId, user])
  );

  let noFoundPosts;
  if (posts.length === 0 && user?._id === userId) {
    noFoundPosts = <NoFoundPosts />;
  }

  let completeProfile;
  if (user?._id === userId) {
    completeProfile = <CompleteProfile />;
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
          onPress={() =>
            navigation.navigate("Post", {
              postId: item._id,
              userId: item.user._id,
            })
          }
        >
          <View style={{ position: "relative" }}>
            <Video
              ref={videoRef}
              style={styles.image}
              source={{
                uri: `${item?.images[0]?.url}`,
              }}
              useNativeControls={false}
              resizeMode="cover"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              shouldPlay={false}
              onTouchStart={() => console.log("Start")}
              isMuted={false}
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
      ListFooterComponent={completeProfile}
    />
  );
};

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
