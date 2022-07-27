import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, IconButtonEdit, MainButton, Protected } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useAuth, useDuration } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { IconButtonDelete } from "../../core/IconButton/IconButtonDelete";
import { useNavigation } from "@react-navigation/native";
import { SECOND_ROLE, THIRD_ROLE } from "@env";

export const CardProduct = ({
  product,
  onDeleteProduct,
  onEditProduct,
  canBook,
}) => {
  const { user: userContext } = useAuth();
  const { t } = useTranslation();
  const {
    name,
    duration,
    description,
    price,
    option,
    service,
    user,
    employee,
  } = product || {};
  const { hours } = user || {};
  const currDuration = duration ? useDuration(duration) : "";
  const navigation = useNavigation();

  const goToCalendar = () =>
    navigation.navigate("CalendarBig", {
      product,
      service,
      owner: user,
      hours,
      employee,
    });

  return (
    <Stack align="start" sx={styles.card}>
      <Stack direction="row" sx={{ width: "100%" }} align="start">
        <Stack align="start" sx={styles.descriptionCont}>
          <Text style={styles.name}>{name}</Text>
          {option && (
            <Stack direction="row">
              <Text style={styles.option}>{option?.name}</Text>
              <Text style={styles.duration}>{currDuration}</Text>
            </Stack>
          )}
          {description && (
            <Text style={styles.description}>{trimFunc(description, 50)}</Text>
          )}
          <Text style={styles.price}>
            {price} {t("ron")}
          </Text>
        </Stack>
        {canBook && hours && (
          <Protected
            roles={[SECOND_ROLE, THIRD_ROLE]}
            userRole={userContext.role}
          >
            <MainButton
              size="md"
              variant="outlined"
              title={t("book")}
              onPress={goToCalendar}
            />
          </Protected>
        )}
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
  descriptionCont: { marginRight: 5, flex: 1 },
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
