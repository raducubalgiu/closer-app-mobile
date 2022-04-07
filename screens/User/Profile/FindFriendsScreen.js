import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";
import { Icon } from "react-native-elements";
import CardFollowers from "../../../components/customized/Cards/CardFollowers";
import { Colors } from "../../../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";

const users = [
  {
    _id: "1",
    name: "Adina Pop",
    channel: "Te urmareste",
  },
  {
    _id: "2",
    name: "Claudia Cernat",
    channel: "Din contactele tale",
  },
  {
    _id: "3",
    name: "Gabriela Ionel",
    channel: "Te urmareste",
  },
  {
    _id: "4",
    name: "Cristiano Ronaldo",
    channel: "Te urmareste",
  },
  {
    _id: "5",
    name: "Anca Bizu",
    channel: "Te urmareste",
  },
  {
    _id: "6",
    name: "Gabriela Ionel",
    channel: "Te urmareste",
  },
  {
    _id: "7",
    name: "Cristiano Ronaldo",
    channel: "Te urmareste",
  },
  {
    _id: "8",
    name: "Anca Bizu",
    channel: "Te urmareste",
  },
  {
    _id: "9",
    name: "Anca Bizu",
    channel: "Te urmareste",
  },
  {
    _id: "10",
    name: "Gabriela Ionel",
    channel: "Te urmareste",
  },
  {
    _id: "11",
    name: "Cristiano Ronaldo",
    channel: "Te urmareste",
  },
  {
    _id: "12",
    name: "Anca Bizu",
    channel: "Te urmareste",
  },
];

const FindFriendsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={21} color={Colors.textDark} />
          </TouchableOpacity>
        }
        secondBox={
          <Text
            style={{
              fontFamily: "Exo-SemiBold",
              color: Colors.textDark,
              fontSize: 15,
            }}
          >
            Gaseste prieteni
          </Text>
        }
        thirdBox={null}
      />
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CardFollowers
              username={item?.name}
              name={item?.channel}
              sxBtn={{
                backgroundColor: Colors.primary,
                borderColor: Colors.primary,
                borderRadius: 2.5,
              }}
              sxBtnText={{ color: "white" }}
            />
          )}
          ListHeaderComponent={
            <TouchableOpacity
              style={{
                backgroundColor: "#f1f1f1",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 5,
                marginVertical: 5,
              }}
            >
              <Icon name="search" type="feather" size={16} />
              <Text
                style={{
                  fontFamily: "Exo-Regular",
                  color: Colors.textLight,
                  marginLeft: 15,
                  fontSize: 13.5,
                }}
              >
                Cauta utilizatori
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FindFriendsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
