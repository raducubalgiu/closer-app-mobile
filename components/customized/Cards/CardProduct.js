import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, IconButtonEdit, OutlinedButton } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useDuration } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { IconButtonDelete } from "../../core/IconButton/IconButtonDelete";

export const CardProduct = ({
  name,
  duration,
  description,
  price,
  canBook,
  option,
  onEditProduct,
  onDeleteProduct,
}) => {
  const { t } = useTranslation();
  const currDuration = duration ? useDuration(duration) : "";

  return (
    <Stack sx={styles.card}>
      <Stack direction="row" align="start" sx={styles.container}>
        <Stack align="start" sx={styles.descriptionCont}>
          <Text style={styles.name}>{name}</Text>
          {option && (
            <Stack direction="row">
              <Text style={styles.option}>{option}</Text>
              <Text style={styles.duration}>{currDuration}</Text>
            </Stack>
          )}
          <Text style={styles.description}>{trimFunc(description, 50)}</Text>
          <Text style={styles.price}>
            {price} {t("ron")}
          </Text>
        </Stack>
        {canBook && <OutlinedButton title={t("book")} />}
        {!canBook && (
          <Stack direction="row">
            <IconButtonEdit onPress={onEditProduct} />
            <IconButtonDelete
              onPress={onDeleteProduct}
              sx={{ marginLeft: 20 }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 10,
  },
  container: { flex: 1 },
  name: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    marginBottom: 1,
  },
  option: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    fontSize: 15,
  },
  duration: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    marginLeft: 10,
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
