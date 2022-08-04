import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
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
  const { t } = useTranslation();

  const { data: likes, loading } = useHttpGet(`/posts/${postId}/get-likes`);

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

  const noFoundLikes = (
    <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} divider={true} />
      {!loading && !likes.length && noFoundLikes}
      {!loading && (
        <FlatList
          ListHeaderComponent={header}
          contentContainerStyle={{ padding: 15 }}
          data={likes}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
        />
      )}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
