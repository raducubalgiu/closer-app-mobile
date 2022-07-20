import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../../hooks";
import { Header } from "../../../components/core";
import { CardPost } from "../../../components/customized";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const AllBookmarksScreens = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/bookmarks`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => setBookmarks(res.data))
        .catch((err) => console.log(err));
    }, [])
  );

  const renderUserBookmarks = ({ item }) => <CardPost post={item?.post} />;
  const getItemLayout = (data, index) => ({
    length: width,
    offset: height * index,
    index,
  });

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("savedPosts")} divider />
      </SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialScrollIndex={3}
        getItemLayout={getItemLayout}
        data={bookmarks}
        keyExtractor={(item) => item?._id}
        renderItem={renderUserBookmarks}
      />
    </View>
  );
};

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

export default AllBookmarksScreens;
