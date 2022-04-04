import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Colors } from "../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";

const ExploreScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://192.168.100.2:8000/api/v1/users")
      .then((resp) => {
        setUsers(resp.data.users);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={{ marginBottom: 50 }}>ExploreScreen</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileGeneral", { userId: item?._id })
            }
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.primary,
              margin: 10,
            }}
          >
            <Text>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
