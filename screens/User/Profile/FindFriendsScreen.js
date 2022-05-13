import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CardFollowers } from "../../../components/customized";
import theme from "../../../assets/styles/theme";
import * as Contacts from "expo-contacts";
import { Header, SearchBarInput } from "../../../components/core";

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

  const renderPerson = ({ item }) => (
    <CardFollowers
      username={item?.name}
      name={"Din contactele tale"}
      sxBtn={styles.btnFollow}
      sxBtnText={{ color: "white" }}
    />
  );

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
          renderItem={renderPerson}
          ListHeaderComponent={<SearchBarInput />}
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
    color: theme.lightColors.black,
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
    backgroundColor: theme.lightColors.primary,
    borderColor: theme.lightColors.primary,
    borderRadius: 2.5,
  },
  container: { paddingHorizontal: 15, flex: 1, backgroundColor: "white" },
});
