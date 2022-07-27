import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Header, Spinner } from "../components/core";
import {
  CardFollowers,
  FakeSearchBarSimple,
  NoFoundMessage,
} from "../components/customized";
import { useAuth, useHttpGet } from "../hooks";
import { useTranslation } from "react-i18next";

const LikesScreen = ({ route }) => {
  const { user } = useAuth();
  const { postId } = route.params;
  const [likes, setLikes] = useState([]);
  const { t } = useTranslation();

  const { loading } = useHttpGet(`/posts/${postId}/get-likes`, (data) =>
    setLikes(data)
  );

  const renderPerson = useCallback(
    ({ item }) => (
      <CardFollowers
        avatar={item?.user?.avatar}
        username={item?.user?.username}
        name={item?.user?.name}
        followeeId={item?.user?._id}
        userId={user?._id}
      />
    ),
    []
  );

  const header = useCallback(
    () => <>{!loading && likes.length > 20 && <FakeSearchBarSimple />}</>,
    []
  );

  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} divider={true} />
      {!loading && likes.length === 0 && (
        <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
      )}
      <View style={styles.listContainer}>
        {loading && <Spinner />}
        {!loading && (
          <FlatList
            style={{ paddingTop: 5 }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={4}
            ListHeaderComponent={header}
            contentContainerStyle={{ marginTop: 10 }}
            data={likes}
            keyExtractor={keyExtractor}
            renderItem={renderPerson}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: { marginHorizontal: 15, flex: 1 },
});
