import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Divider } from "react-native-elements";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../assets/styles/Colors";

const FakeSearchBar = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.fakeInput}
      >
        <Icon
          name="search"
          style={{
            backgroundColor: "#f1f1f1",
            padding: 7.5,
            borderRadius: 100,
          }}
          color="grey"
          size={20}
        />
        <Text style={styles.fakeInputText}>{t("searchInputTitle")}</Text>
      </TouchableOpacity>
      <Divider orientation="vertical" />
      <TouchableOpacity style={styles.datePicker}>
        <View style={styles.datePickerDetails}>
          <Icon name="access-time" size={18} />
          <Text style={styles.datePickerTitle}>Acum</Text>
          <Icon name="keyboard-arrow-down" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FakeSearchBar;

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
    borderRadius: 20,
  },
  fakeInput: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fakeInputText: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.textLight,
    fontFamily: "Exo-Regular",
  },
  datePicker: {
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  datePickerDetails: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    borderRadius: 20,
  },
  datePickerTitle: {
    textAlign: "center",
    marginLeft: 3,
    marginRight: 10,
    fontSize: 13,
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
  },
});
