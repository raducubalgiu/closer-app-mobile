import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OutlinedButton from "../../core/Buttons/OutlinedButton";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useTranslation } from "react-i18next";

const CardProduct = (props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <Stack direction="row" align="start" sx={styles.cardLayout}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={styles.name}>{props.name}</Text>
          {props.description && (
            <Text style={styles.description}>
              {trimFunc(props.description, 100)}
            </Text>
          )}
          <Text style={styles.description}>30 de minute</Text>
          <Text style={styles.price}>{props.price} RON</Text>
        </View>
        {props.canBook && (
          <OutlinedButton title={t("book")} style={{ flex: 1 }} />
        )}
        {!props.canBook && (
          <OutlinedButton title={t("edit")} style={{ flex: 1 }} />
        )}
      </Stack>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    //borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 10,
  },
  cardLayout: { flex: 1 },
  name: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    marginBottom: 1,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
  },
  price: {
    fontFamily: "Exo-Bold",
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: theme.lightColors.primary,
  },
  buttonText: {
    color: theme.lightColors.black,
    fontFamily: "Exo-Medium",
  },
});
