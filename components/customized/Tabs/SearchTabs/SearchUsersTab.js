import { StyleSheet, FlatList, View } from "react-native";
import { useCallback, useState } from "react";
import { useHttpGet } from "../../../../hooks";
import { CardFollowers } from "../../Cards/CardFollowers";
import { useTranslation } from "react-i18next";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";

export const SearchUsersTab = ({ search }) => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const { data: users, loading } = useHttpGet(
    `/users/search?search=${search}&page=${page}&limit=10`
  );

  const renderUsers = useCallback(
    ({ item }) => (
      <CardFollowers
        avatar={item.avatar}
        followeeId={item._id}
        username={item.username}
        name={item.name}
        counter={item.counter}
        checkmark={item.checkmark}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

  const noFoundMessage = (
    <NoFoundMessage title="Users" description={t("noFoundUsers")} />
  );

  return (
    <View style={styles.screen}>
      {!loading && (
        <FlatList
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderUsers}
          contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 15 }}
          ListHeaderComponent={!loading && !users?.length && noFoundMessage}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
