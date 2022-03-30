import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Avatar, Icon } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";

const DATA = [
  {
    _id: "1",
    name: "Raducu Balgiu",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    job: "Admin",
  },
  {
    _id: "2",
    name: "Trattoria Monza",
    avatar:
      "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
    job: "Restaurant",
  },
];

const SwitchAccount = () => {
  return (
    <>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Exo-SemiBold",
            color: Colors.textDark,
            marginBottom: 15,
          }}
        >
          Comuta contul
        </Text>
        <Divider />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar size={55} rounded source={{ uri: `${item?.avatar}` }} />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontFamily: "Exo-SemiBold",
                    marginBottom: 2.5,
                    fontSize: 15,
                  }}
                >
                  {item?.name}
                </Text>
                <Text
                  style={{ fontFamily: "Exo-Medium", color: Colors.textLight }}
                >
                  {item?.job}
                </Text>
              </View>
            </View>
            <View>
              <Icon name="check" type="andesign" color={Colors.primary} />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Avatar
              size={55}
              rounded
              icon={{
                name: "plus",
                type: "feather",
                color: Colors.textDark,
                size: 26,
              }}
              containerStyle={{ backgroundColor: "#eee" }}
            />
            <Text
              style={{
                fontFamily: "Exo-Medium",
                marginBottom: 2.5,
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Adauga o noua locatie
            </Text>
          </TouchableOpacity>
        }
      />
    </>
  );
};

export default SwitchAccount;

const styles = StyleSheet.create({});
