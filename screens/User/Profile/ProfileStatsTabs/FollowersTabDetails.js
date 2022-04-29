import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import CardFollowers from "../../../../components/customized/Cards/CardFollowers";
import { useNavigation } from "@react-navigation/native";

const FollowersTabDetails = (props) => {
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.navigate("ProfileGeneral", { userId });
  };

  return (
    <View style={styles.screen}>
      {/* <FlatList
        data={props?.followers}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardFollowers
            onGoToUser={() => goToUser(item?._id)}
            onFollowUser={() => {}}
            avatar={item?.userId?.avatar}
            username={item?.userId?.username}
            name={item?.userId?.name}
            followingId={item?.userId?._id}
          />
        )}
      /> */}
    </View>
  );
};

export default FollowersTabDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
