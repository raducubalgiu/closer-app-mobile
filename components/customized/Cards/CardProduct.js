import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OutlinedButton from "../../core/Buttons/OutlinedButton";
import { Stack, IconButton } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useDuration } from "../../../hooks";
import { useTranslation } from "react-i18next";

const CardProduct = (props) => {
  const { t } = useTranslation();

  const duration = props?.duration ? useDuration(props?.duration) : "";
  let renderDuration;
  if (duration) {
    renderDuration = (
      <Text style={styles.description}>
        {t("duration")}: {duration}
      </Text>
    );
  }

  return (
    <View style={styles.card}>
      <Stack direction="row" align="start" sx={styles.cardLayout}>
        <View style={styles.descriptionCont}>
          <Text style={styles.name}>{props.name}</Text>
          {renderDuration}
          {props.description && (
            <Text style={styles.description}>
              {trimFunc(props.description, 100)}
            </Text>
          )}
          <Text style={styles.price}>
            {props.price} {t("ron")}
          </Text>
        </View>
        {props.canBook && <OutlinedButton title={t("book")} />}
        {!props.canBook && (
          <Stack direction="row">
            <IconButton
              iconName="edit"
              iconType="antdesign"
              onPress={props.onEditProduct}
            />
            <IconButton
              iconName="delete"
              iconType="antdesign"
              onPress={props.onDeleteProduct}
              sx={{ marginLeft: 20 }}
            />
          </Stack>
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
  descriptionCont: { flex: 1, marginRight: 5 },
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
