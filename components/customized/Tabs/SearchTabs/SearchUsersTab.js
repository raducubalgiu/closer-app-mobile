import { StyleSheet, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { useHttpGet } from "../../../../hooks";
import { CardFollowers } from "../../Cards/CardFollowers";

export const SearchUsersTab = ({ search }) => {
  const [page, setPage] = useState(1);

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

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={renderUsers}
      contentContainerStyle={styles.screen}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
  },
});
