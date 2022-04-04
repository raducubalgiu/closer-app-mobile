import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardFollowers from "../../../../components/customized/Cards/CardFollowers";
import { useAuth } from "../../../../context/auth";

const FollowingScreen = () => {
  const { user } = useAuth();
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${user?._id}/get-followings`)
      .then((res) => setFollowings(res.data.followings))
      .catch((err) => console.log(err));
  }, [user?._id]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={followings}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardFollowers
            onPress={() => {}}
            avatar={item?.followingId?.avatar}
            username={item?.followingId?.username}
            name={item?.followingId?.name}
          />
        )}
      />
    </View>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
