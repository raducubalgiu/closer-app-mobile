import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Divider } from "react-native-elements";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";

const FakeSearchBar = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate("Search")}
        style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
      >
        <Icon name="search" type="feather" color={Colors.textDark} size={20} />
        <Text style={styles.fakeInputText}>{t("searchInputTitle")}</Text>
      </TouchableOpacity>
      <Divider orientation="vertical" style={{ marginRight: 15 }} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 20,
          paddingVertical: 5,
          paddingHorizontal: 7.5,
        }}
      >
        <Icon
          name="clock"
          type="feather"
          size={17}
          style={{ marginRight: 5 }}
        />
        <Text
          style={{
            marginRight: 5,
            fontFamily: "Exo-SemiBold",
            color: Colors.textDark,
          }}
        >
          Acum
        </Text>
        <Icon name="keyboard-arrow-down" />
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
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  fakeInput: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderWidth: 2,
    borderColor: "#f1f1f1",
  },
  fakeInputText: {
    marginLeft: 10,
    fontSize: 14.5,
    color: Colors.textLight,
    fontFamily: "Exo-Regular",
  },
  datePicker: {
    textAlign: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  datePickerDetails: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 7,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  datePickerTitle: {
    textAlign: "center",
    marginLeft: 3,
    marginRight: 10,
    fontSize: 13,
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
  },
  iconSearch: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 100,
  },
});
