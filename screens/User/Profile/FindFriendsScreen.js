import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import CardFollowers from "../../../components/customized/Cards/CardFollowers";
import { Colors } from "../../../assets/styles/Colors";
import * as Contacts from "expo-contacts";
import FakeSearchBarSimple from "../../../components/customized/FakeSearchBar/FakeSearchBarSimple";
import Header from "../../../components/customized/Headers/Header";

const FindFriendsScreen = () => {
  const [contacts, setContacts] = useState([]);

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
    <>
      <SafeAreaView style={styles.screen}>
        <Header title="Gaseste prieteni" />
      </SafeAreaView>
      <View style={styles.container}>
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
          ListHeaderComponent={<FakeSearchBarSimple />}
        />
      </View>
    </>
  );
};

export default FindFriendsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
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
  container: { paddingHorizontal: 15, flex: 1, backgroundColor: "white" },
});
