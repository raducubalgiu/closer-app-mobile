import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";

const { primary, black } = theme.lightColors;

export const DashboardCalendarSheet = () => {
  const { t } = useTranslation();

  const buttons = [
    { _id: "1", title: "Ultimele 7 zile" },
    { _id: "2", title: "Ultimele 15 zile" },
    { _id: "3", title: "Ultimele 30 de zile" },
  ];

  const renderButton = ({ item }) => (
    <Pressable style={styles.button}>
      <Text style={styles.buttonTxt}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={{ padding: 15 }}>
      <Stack direction="row" sx={{ marginBottom: 15 }}>
        <Pressable style={styles.cancelBtn}>
          <Text style={styles.cancelBtnTxt}>{t("cancel")}</Text>
        </Pressable>
        <Text style={styles.period}>19 iun. - 30 iun.</Text>
        <Pressable>
          <Text style={styles.confirmBtnTxt}>{t("confirm")}</Text>
        </Pressable>
      </Stack>
      <Divider />
      <Stack direction="row" sx={{ marginVertical: 7.5 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={buttons}
          keyExtractor={(item) => item._id}
          renderItem={renderButton}
        />
      </Stack>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  cancelBtn: {},
  cancelBtnTxt: { fontSize: 15, color: black },
  confirmBtnTxt: { fontSize: 15, color: primary },
  period: { color: black, fontSize: 15 },
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginRight: 5,
    borderRadius: 15,
  },
  buttonTxt: {
    color: black,
  },
});
