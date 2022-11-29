import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import UserListItem from "../../../components/customized/ListItems/UserListItem";
import theme from "../../../assets/styles/theme";
import * as Contacts from "expo-contacts";
import { Header, SearchBarInput } from "../../../components/core";

const { primary, black } = theme.lightColors || {};

export const FindFriendsScreen = () => {
  const [contacts, setContacts] = useState<any>([]);

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

  const renderPerson = ({ item }: any) => <UserListItem user={item} />;

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <Header title="Gaseste prieteni" />
      </SafeAreaView>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contacts}
          keyExtractor={(item: any) => item.id}
          renderItem={renderPerson}
          ListHeaderComponent={<SearchBarInput />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
  title: {
    color: black,
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
    backgroundColor: primary,
    borderColor: primary,
    borderRadius: 2.5,
  },
  container: { paddingHorizontal: 15, flex: 1, backgroundColor: "white" },
});
