import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import CardFollowers from "../../Cards/CardFollowers";
import { useNavigation } from "@react-navigation/native";
import FakeSearchBarSimple from "../../FakeSearchBar/FakeSearchBarSimple";
import SearchBarInput from "../../../core/Inputs/SearchBarInput";

const FollowingTabDetails = (props) => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.navigate("ProfileGeneralStack", {
      screen: "ProfileGeneral",
      params: { userId },
    });
  };

  const updateSearch = (text) => {
    setSearch(text);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={styles.screen}>
      <SearchBarInput
        showCancel={false}
        placeholder="Cauta"
        value={search}
        updateValue={updateSearch}
      />
      {/* <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<FakeSearchBarSimple sx={{ marginTop: 10 }} />}
        data={props.followings}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardFollowers
            onGoToUser={() => goToUser(item?._id)}
            onFollowUser={() => {}}
            avatar={item?.followingId?.avatar}
            username={item?.followingId?.username}
            name={item?.followingId?.name}
            followingId={item?.followingId?._id}
          />
        )}
      /> */}
    </View>
  );
};

export default FollowingTabDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
