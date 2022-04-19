import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import CardFollowers from "../../../../components/customized/Cards/CardFollowers";
import { useNavigation } from "@react-navigation/native";
import FakeSearchBarSimple from "../../../../components/customized/FakeSearchBar/FakeSearchBarSimple";

const FollowingTabDetails = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.navigate("ProfileGeneralStack", {
      screen: "ProfileGeneral",
      params: { userId },
    });
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
      <FlatList
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
      />
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
