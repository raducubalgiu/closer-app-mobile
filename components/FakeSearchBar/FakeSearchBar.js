import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Divider } from "react-native-elements";
import React from "react";
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
        <Icon name="search" style={styles.iconSearch} color="gray" size={17} />
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
    marginVertical: 10,
    marginHorizontal: 10,
    // shadowColor: "#c9c5c5",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 10,

    // elevation: 11,
    // borderRadius: 20,
  },
  fakeInput: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderWidth: 2,
    borderColor: "#f1f1f1",
    borderTopLeftRadius: 10,
  },
  fakeInputText: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.textLight,
    fontFamily: "Exo-Regular",
  },
  datePicker: {
    textAlign: "center",
    paddingVertical: 6.5,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderBottomRightRadius: 10,
  },
  datePickerDetails: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
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
