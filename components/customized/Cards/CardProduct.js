import { StyleSheet, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SECOND_ROLE, THIRD_ROLE } from "@env";
import { Stack, IconButtonEdit, MainButton, Protected } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useAuth, useDuration, useHttpGet } from "../../../hooks";
import { IconButtonDelete } from "../../core/IconButton/IconButtonDelete";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import { UserListItemSimple } from "../ListItems/UserListItemSimple";

const { black, grey0, primary } = theme.lightColors;

export const CardProduct = ({
  product,
  ownerInfo = false,
  onDeleteProduct,
  onEditProduct,
}) => {
  const { user: userContext } = useAuth();
  const { t } = useTranslation();
  const { name, duration, description, price } = product || {};
  const { option, service, user, employee } = product || {};
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

  const goToOwner = () => {
    navigation.navigate("ProfileGeneral", { ...user });
  };

  const { data, loading } = useHttpGet(
    `/users/${userContext?._id}/products/${product?._id}/bookmarks`
  );

  return (
    <>
      {!loading && (
        <Stack sx={styles.card}>
          <Stack direction="row" sx={{ width: "100%" }} align="start">
            <Stack align="start" sx={styles.descriptionCont}>
              <Text style={styles.name}>{name} </Text>
              {option && (
                <Stack direction="row">
                  <Text style={styles.option}>{option?.name}</Text>
                  <Text style={styles.duration}>{currDuration}</Text>
                </Stack>
              )}
              {description && (
                <Text style={styles.description}>
                  {trimFunc(description, 50)}
                </Text>
              )}
              <Text style={styles.price}>
                {price} {t("ron")}
              </Text>
            </Stack>
            <Stack>
              <Protected
                roles={[SECOND_ROLE, THIRD_ROLE]}
                userRole={userContext.role}
              >
                <MainButton
                  size="md"
                  title={t("book")}
                  onPress={goToCalendar}
                />
              </Protected>
              {/* <Stack direction="row">
                <IconButtonEdit onPress={onEditProduct} />
                <IconButtonDelete
                  onPress={onDeleteProduct}
                  sx={{ marginLeft: 20 }}
                />
              </Stack> */}
            </Stack>
          </Stack>
          {ownerInfo && (
            <UserListItemSimple
              name={user?.name}
              profession={user?.profession.name}
              avatar={user?.avatar}
              onGoToUser={goToOwner}
            />
          )}
          <Protected
            roles={[SECOND_ROLE, THIRD_ROLE]}
            userRole={userContext.role}
          >
            <Stack align="end" sx={styles.bookmark}>
              <BookmarkButton
                status={data.status}
                type="products"
                typeId={product._id}
              />
            </Stack>
          </Protected>
        </Stack>
      )}
    </>
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
    fontSize: 16,
    marginBottom: 5,
    color: black,
    fontWeight: "600",
  },
  option: {
    color: primary,
    fontSize: 14,
    fontWeight: "600",
  },
  duration: {
    color: theme.lightColors.black,
    marginLeft: 10,
    fontWeight: "500",
  },
  descriptionCont: { marginRight: 5, flex: 1 },
  description: {
    color: grey0,
    marginTop: 5,
  },
  price: {
    marginTop: 10,
    fontSize: 15,
    color: black,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: primary,
  },
  buttonText: {
    color: black,
  },
  bookmark: {
    width: "100%",
    marginTop: 10,
  },
});
