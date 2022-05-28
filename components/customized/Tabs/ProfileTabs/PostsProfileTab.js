import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Image, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CompleteProfile from "../../CompleteProfile/CompleteProfile";
import NoFoundPosts from "../../NotFoundContent/NoFoundPosts";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

export const PostsProfileTab = ({ userId, username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-posts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => setPosts(res.data.posts))
        .catch((err) => console.log(err));
    }, [userId, user])
  );

  let noFoundPosts;
  if (posts.length === 0 && user?._id !== userId) {
    noFoundPosts = (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("posts")}
        description={`${t("postsCreatedBy")} ${username} ${t("willApearHere")}`}
      />
    );
  } else if (posts.length === 0 && user?._id === userId) {
    noFoundPosts = <NoFoundPosts />;
  }
  let completeProfile;
  if (user?._id === userId) {
    completeProfile = <CompleteProfile />;
  }

  return (
    // <View>
    //   <ScrollView nestedScrollEnabled={true}>
    //     <FlatList
    //       ListHeaderComponent={noFoundPosts}
    //       style={{ backgroundColor: "white" }}
    //       showsVerticalScrollIndicator={false}
    //       data={posts}
    //       numColumns={3}
    //       keyExtractor={(item) => item._id}
    //       listKey={(item) => item._id}
    //       scrollEnabled={false}
    //       renderItem={({ item }) => (
    //         <TouchableOpacity
    //           activeOpacity={1}
    //           style={styles.box}
    //           onPress={() =>
    //             navigation.navigate("Post", {
    //               postId: item._id,
    //               userId: item.user._id,
    //             })
    //           }
    //         >
    //           <View style={{ position: "relative" }}>
    //             <Image
    //               source={{
    //                 uri: `${item?.images[0]?.url}`,
    //               }}
    //               style={styles.image}
    //             />
    //             {item?.bookable && (
    //               <View style={styles.bookable}>
    //                 <Icon
    //                   name="shopping"
    //                   type="material-community"
    //                   color="white"
    //                   size={20}
    //                   style={{ marginLeft: 5 }}
    //                 />
    //               </View>
    //             )}
    //             {item?.fixed && (
    //               <View style={styles.fixed}>
    //                 <Text style={styles.fixedText}>Fixat</Text>
    //               </View>
    //             )}
    //             {!item?.fixed && item?.postType === "video" && (
    //               <View style={styles.type}>
    //                 <Icon
    //                   name="video"
    //                   type="feather"
    //                   color="white"
    //                   size={20}
    //                   style={{ marginLeft: 5 }}
    //                 />
    //               </View>
    //             )}
    //           </View>
    //         </TouchableOpacity>
    //       )}
    //       ListFooterComponent={completeProfile}
    //     />
    //   </ScrollView>
    // </View>
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {posts.map((item, i) => (
        <Image
          key={i}
          source={{
            uri: `${item?.images[0]?.url}`,
          }}
          //style={styles.image}
          containerStyle={styles.image}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width / 3,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    // flex: 1,
    // aspectRatio: 1,
    width: width / 3,
    height: height / 3,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "white",
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
