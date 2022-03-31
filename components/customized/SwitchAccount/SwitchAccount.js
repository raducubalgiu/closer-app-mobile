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
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import { useAuth } from "../../../context/auth";

const SwitchAccount = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const USERS = [user];

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
        data={USERS}
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
              {!user?.avatar && (
                <Avatar
                  size={55}
                  rounded
                  icon={{ name: "user", type: "font-awesome", size: 22.5 }}
                  containerStyle={{ backgroundColor: "#ccc" }}
                />
              )}
              {user?.avatar && (
                <Avatar
                  size={55}
                  rounded
                  source={{ uri: `${item?.avatar}` }}
                  containerStyle={{ backgroundColor: "#ccc" }}
                />
              )}
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
            onPress={() =>
              navigation.navigate("Order", {
                activeStep: 1,
                headerLabel: "Detalii Business",
              })
            }
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
