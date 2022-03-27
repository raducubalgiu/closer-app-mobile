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
        activeOpacity={1}
        onPress={() => navigation.navigate("Search")}
        style={styles.fakeInput}
      >
        <Icon name="search" style={styles.iconSearch} color="gray" size={17} />
        <Text style={styles.fakeInputText}>{t("searchInputTitle")}</Text>
      </TouchableOpacity>
      <Divider orientation="vertical" />
      <View style={styles.datePicker}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.datePickerDetails}
        >
          <Icon name="access-time" size={18} />
          <Text style={styles.datePickerTitle}>Acum</Text>
          <Icon name="keyboard-arrow-down" />
        </TouchableOpacity>
      </View>
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
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  fakeInputText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Exo-Regular",
  },
  datePicker: {
    textAlign: "center",
    paddingVertical: 6.5,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  datePickerDetails: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
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
  iconSearch: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 100,
  },
});
