import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import CardFollowers from "../../../../components/customized/Cards/CardFollowers";
import { useNavigation } from "@react-navigation/native";

const FollowingTabDetails = (props) => {
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.navigate("ProfileGeneral", { userId });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.followings}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardFollowers
            onGoToUser={() => goToUser(item?._id)}
            onFollowUser={() => {}}
            avatar={item?.followingId?.avatar}
            username={item?.followingId?.username}
            name={item?.followingId?.name}
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
