import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

const FakeSearchBar = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("Search", {
            period: { type: "calendar", code: 0 },
          })
        }
        style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
      >
        <Icon
          name="search"
          type="feather"
          color={theme.lightColors.black}
          size={20}
        />
        <Text style={styles.fakeInputText}>{t("searchInputTitle")}</Text>
      </TouchableOpacity>
      <Divider orientation="vertical" style={{ marginRight: 15 }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Search", {
            period: { type: "now", code: 1 },
          })
        }
        style={styles.nowBtn}
      >
        <Icon
          name="clock"
          type="feather"
          size={15}
          style={{ marginRight: 5 }}
          color={theme.lightColors.black}
        />
        <Text style={styles.nowBtnText}>{t("now")}</Text>
        <Icon name="keyboard-arrow-down" color={theme.lightColors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default FakeSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  fakeInput: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderWidth: 2,
    borderColor: "#f1f1f1",
  },
  fakeInputText: {
    marginLeft: 10,
    fontSize: 14,
    color: theme.lightColors.grey0,
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
    color: theme.lightColors.black,
  },
  iconSearch: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 100,
  },
  nowBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 2.5,
    paddingHorizontal: 7.5,
  },
  nowBtnText: {
    marginRight: 5,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 13.5,
  },
});
