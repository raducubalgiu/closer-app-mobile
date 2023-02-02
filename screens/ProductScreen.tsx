import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Header, Heading, Protected, Stack } from "../components/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { useTranslation } from "react-i18next";
import { Divider, Icon } from "@rneui/themed";
import { BookmarkButton, UserListItemSimple } from "../components/customized";
import theme from "../assets/styles/theme";
import { trimFunc } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { SECOND_ROLE, THIRD_ROLE } from "@env";
import { useAuth, useGet } from "../hooks";

const { black, grey0, primary } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Product">;

export const ProductScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: product } = useGet({
    model: "product",
    uri: `/products/${route.params.id}`,
  });

  const { ownerId, ratingsAverage, ratingsQuantity, serviceId } = product || {};
  const { bookmarksCount, reservationsCount, locationId } = product || {};
  const { name, duration, price, priceDiscount, option, description } =
    product || {};

  const goToCalendar = () => {
    navigation.navigate("CalendarBig", {
      product: {
        id: product?._id,
        bookmarksCount,
        reservationsCount,
        name,
        duration,
        price,
        priceDiscount,
        serviceId,
        locationId,
        option,
        description,
        ownerId,
      },
      serviceId: product?.serviceId,
    });
  };

  const goToOwner = () => {
    navigation.push("ProfileGeneral", {
      userId: ownerId._id,
      username: ownerId?.username,
      avatar: ownerId?.avatar,
      name: ownerId?.name,
      checkmark: ownerId?.checkmark,
      service: null,
      option: null,
    });
  };

  const goToProductReviews = () =>
    navigation.navigate("ProductReviews", {
      productId: product?._id,
      productName: product?.name,
      ownerId: ownerId?._id,
    });

  return (
    <SafeAreaView style={styles.screen}>
      <Header divider title={t("products")} />
      <ScrollView style={{ marginHorizontal: 15 }}>
        <Stack align="start">
          <Stack direction="row" align="start">
            <Heading title={product?.name} sx={{ fontSize: 16 }} />
            <Text style={styles.service}>{serviceId?.name}</Text>
          </Stack>
          <Text style={styles.price}>{product?.price} LEI</Text>
          <Stack direction="row" sx={{ marginTop: 15 }}>
            <Icon name="star" type="antdesign" color={primary} />
            <Pressable onPress={goToProductReviews}>
              <Stack direction="row">
                <Text style={styles.ratingsAverage}>{ratingsAverage}</Text>
                <Text style={styles.ratingsQuantity}>({ratingsQuantity})</Text>
              </Stack>
            </Pressable>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 15 }}>
            <Icon name="bookmark" type="feather" color={grey0} size={20} />
            <Text style={styles.counter}>{bookmarksCount} persoane</Text>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 10 }}>
            <Icon name="shopping-bag" type="feather" color={grey0} size={20} />
            <Text style={styles.counter}>{reservationsCount} rezervari</Text>
          </Stack>
          <UserListItemSimple
            name={ownerId?.name}
            profession={ownerId?.profession.name}
            avatar={ownerId?.avatar}
            checkmark={ownerId?.checkmark}
            onGoToUser={goToOwner}
            sx={{ marginTop: 25 }}
          />
          <Protected userRole={user?.role} roles={[SECOND_ROLE, THIRD_ROLE]}>
            <Stack sx={{ marginTop: 25, width: "100%" }} align="end">
              <BookmarkButton type="products" typeId={route.params.id} />
            </Stack>
          </Protected>
        </Stack>
        <Divider style={{ marginTop: 15 }} />
        <Stack align="start">
          <Heading title="Descriere" sx={styles.heading} />
          <Text style={styles.description}>
            {trimFunc(product?.description, 140)}
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
  service: {
    fontWeight: "600",
    color: black,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 2.5,
    marginTop: 10,
    marginLeft: 10,
  },
  price: { color: black, fontSize: 20, fontWeight: "600" },
  counter: { marginLeft: 5, color: grey0, fontWeight: "500" },
  ratingsAverage: {
    marginLeft: 5,
    color: black,
    fontWeight: "700",
    fontSize: 15,
  },
  ratingsQuantity: {
    marginLeft: 5,
    color: grey0,
    fontWeight: "500",
    fontSize: 15,
  },
  description: { color: grey0, fontSize: 14, lineHeight: 17.5 },
});
