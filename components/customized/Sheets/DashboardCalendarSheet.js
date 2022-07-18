import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";
import { Button, Stack } from "../../core";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";

const { primary, black } = theme.lightColors;

export const DashboardCalendarSheet = () => {
  const { t } = useTranslation();

  const buttons = [
    { _id: "1", title: "Ultimele 7 zile" },
    { _id: "2", title: "Ultimele 15 zile" },
    { _id: "3", title: "Ultimele 30 de zile" },
  ];

  const renderButton = ({ item }) => (
    <Button sx={styles.button}>
      <Text style={styles.buttonTxt}>{item.title}</Text>
    </Button>
  );

  return (
    <View style={{ padding: 15 }}>
      <Stack direction="row" sx={{ marginBottom: 15 }}>
        <Button style={styles.cancelBtn}>
          <Text style={styles.cancelBtnTxt}>{t("cancel")}</Text>
        </Button>
        <Text style={styles.period}>19 iun. - 30 iun.</Text>
        <Button>
          <Text style={styles.confirmBtnTxt}>{t("confirm")}</Text>
        </Button>
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
  cancelBtnTxt: { fontFamily: "Exo-Bold", fontSize: 15, color: black },
  confirmBtnTxt: { fontFamily: "Exo-Bold", fontSize: 15, color: primary },
  period: { fontFamily: "Exo-SemiBold", color: black, fontSize: 15 },
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginRight: 5,
    borderRadius: 15,
  },
  buttonTxt: {
    fontFamily: "Exo-Medium",
    color: black,
  },
});
