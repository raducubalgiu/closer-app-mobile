import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";
import { Icon } from "react-native-elements";
import CardFollowers from "../../../components/customized/Cards/CardFollowers";
import { Colors } from "../../../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";
import * as Contacts from "expo-contacts";

const FindFriendsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contacts = data;
          setContacts(contacts);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={21} color={Colors.textDark} />
          </TouchableOpacity>
        }
        secondBox={<Text style={styles.title}>Gaseste prieteni</Text>}
        thirdBox={null}
      />
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardFollowers
              username={item?.name}
              name={"Din contactele tale"}
              sxBtn={styles.btnFollow}
              sxBtnText={{ color: "white" }}
            />
          )}
          ListHeaderComponent={
            <TouchableOpacity style={styles.btn}>
              <Icon name="search" type="feather" size={16} />
              <Text style={styles.findUsers}>Cauta utilizatori</Text>
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
  title: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  btnFollow: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: 2.5,
  },
  findUsers: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
    marginLeft: 15,
    fontSize: 13.5,
  },
});
