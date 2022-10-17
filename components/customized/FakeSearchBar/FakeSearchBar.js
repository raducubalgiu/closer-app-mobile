import { StyleSheet, Text, View } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { Button, Stack } from "../../core";

const { black, grey0 } = theme.lightColors;

const FakeSearchBar = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToServicesAnytime = () =>
    navigation.navigate("SearchServices", {
      period: { code: 0 },
    });
  const goToServicesNow = () =>
    navigation.navigate("SearchServices", {
      period: { code: 1 },
    });

  return (
    <View style={styles.container}>
      <Button onPress={goToServicesAnytime} sx={{ flex: 1 }}>
        <Stack direction="row" justify="start">
          <Icon name="search" type="feather" color={black} size={20} />
          <Text style={styles.fakeInputText}>{t("searchService")}</Text>
        </Stack>
      </Button>
      <Divider orientation="vertical" style={{ marginRight: 15 }} />
      <Button onPress={goToServicesNow} sx={styles.nowBtn}>
        <Icon
          name="clock"
          type="feather"
          size={15}
          style={{ marginRight: 5 }}
          color={black}
        />
        <Text style={styles.nowBtnText}>{t("now")}</Text>
        <Icon name="keyboard-arrow-down" color={black} />
      </Button>
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
    marginHorizontal: 10,
    borderRadius: 10,
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
    marginLeft: 7.5,
    fontSize: 15,
    color: grey0,
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
    color: black,
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
    color: black,
    fontSize: 13.5,
    fontWeight: "600",
  },
});
