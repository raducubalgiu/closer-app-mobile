import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Header, Heading, Protected, Stack } from "../components/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { useTranslation } from "react-i18next";
import { Divider, Icon } from "@rneui/themed";
import { BookmarkButton, UserListItemSimple } from "../components/customized";
import theme from "../assets/styles/theme";
import { trimFunc } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { SECOND_ROLE, THIRD_ROLE } from "@env";
import { useAuth } from "../hooks";

const { black, grey0, primary } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Product">;

export const ProductScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { product } = route.params;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    id,
    bookmarksCount,
    description,
    duration,
    name,
    option,
    price,
    priceDiscount,
    reservationsCount,
    ownerId,
    serviceId,
  } = product;

  const goToCalendar = () => {
    navigation.navigate("CalendarBig", {
      product: product,
      serviceId,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        divider
        title={
          <Stack>
            <Text
              style={{
                textTransform: "uppercase",
                color: grey0,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              {t("product")}
            </Text>
            <Text
              style={{
                color: black,
                fontSize: 16,
                fontWeight: "600",
                marginTop: 2.5,
              }}
            >
              {name}
            </Text>
          </Stack>
        }
      />
      <ScrollView style={{ marginHorizontal: 15 }}>
        <Stack align="start">
          <Stack direction="row" align="start">
            <Heading title="Serviciu:" sx={{ fontSize: 16 }} />
            <Text
              style={{
                fontWeight: "600",
                color: black,
                borderWidth: 1,
                borderColor: "#ddd",
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              ITP
            </Text>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 15 }}>
            <Icon name="star" type="antdesign" color={primary} />
            <Stack direction="row">
              <Text
                style={{
                  marginLeft: 5,
                  color: black,
                  fontWeight: "700",
                  fontSize: 15,
                }}
              >
                4.5
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: grey0,
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                (100 de recenzii)
              </Text>
            </Stack>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 15 }}>
            <Icon name="bookmark" type="feather" color={grey0} size={20} />
            <Text style={{ marginLeft: 5, color: grey0, fontWeight: "500" }}>
              {bookmarksCount} persoane
            </Text>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 10 }}>
            <Icon name="shopping-bag" type="feather" color={grey0} size={20} />
            <Text style={{ marginLeft: 5, color: grey0, fontWeight: "500" }}>
              {reservationsCount} rezervari
            </Text>
          </Stack>
          <UserListItemSimple
            name={ownerId?.name}
            profession={ownerId?.profession.name}
            avatar={ownerId?.avatar}
            checkmark={ownerId?.checkmark}
            onGoToUser={() => {}}
            sx={{ marginTop: 25 }}
          />
          <Protected userRole={user?.role} roles={[SECOND_ROLE, THIRD_ROLE]}>
            <Stack sx={{ marginTop: 25, width: "100%" }} align="end">
              <BookmarkButton type="products" typeId={id} />
            </Stack>
          </Protected>
        </Stack>
        <Divider style={{ marginTop: 15 }} />
        <Stack align="start">
          <Heading title="Descriere" sx={styles.heading} />
          <Text style={{ color: grey0, fontSize: 14, lineHeight: 17.5 }}>
            {trimFunc(
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae arecusandae, vel, ipsum dicta totam nulla in saepe consequatur provident facere. Dolores expedita cumque soluta, laboriosam ratione consequatur accusantium sint.",
              140
            )}
          </Text>
        </Stack>
      </ScrollView>
      <Protected userRole={user?.role} roles={[SECOND_ROLE, THIRD_ROLE]}>
        <Button
          sxBtn={{ marginHorizontal: 15 }}
          title={t("book")}
          onPress={goToCalendar}
        />
      </Protected>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },
  heading: { fontSize: 17 },
});
