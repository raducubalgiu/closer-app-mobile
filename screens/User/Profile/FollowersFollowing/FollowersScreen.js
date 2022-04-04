import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardFollowers from "../../../../components/customized/Cards/CardFollowers";
import { useAuth } from "../../../../context/auth";

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${user?._id}/get-followers`)
      .then((res) => setFollowers(res.data.followers))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={followers}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardFollowers
            onPress={() => {}}
            avatar={item?.userId?.avatar}
            username={item?.userId?.username}
            name={item?.userId?.name}
          />
        )}
      />
    </View>
  );
};

export default FollowersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
