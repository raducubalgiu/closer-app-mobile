import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { Button, Stack } from "../../core";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Product } from "../../../models/product";
import theme from "../../../assets/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";

type IProps = { product: Product; expirationTime: any };
const { secondary, black, error, grey0 } = theme.lightColors || {};

const ProductSheet = ({ product, expirationTime }: IProps) => {
  const { t } = useTranslation();
  const { priceWithDiscount, price, name, discount, option, duration } =
    product;
  const expire = dayjs(expirationTime).utc().format("DD MMMM, HH:mm");

  return (
    <BottomSheetScrollView style={styles.container} bounces={false}>
      <Stack>
        <LinearGradient
          colors={["rgba(51, 194, 255, 0.9)", "white"]}
          start={{ x: 1.4, y: 0.75 }}
          end={{ x: 1.75, y: 0.75 }}
          style={styles.productContainer}
        >
          <Text style={styles.product}>{t("lastMinuteOffer")}</Text>
        </LinearGradient>
      </Stack>
      <Stack sx={{ marginVertical: 5 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {price} {t("lei")}
        </Text>
        <Stack direction="row">
          <Text style={styles.priceDiscount}>
            {priceWithDiscount} {t("lei")}
          </Text>
          <Text style={styles.discount}>(-{discount}%)</Text>
        </Stack>
      </Stack>
      <Stack align="start">
        <Stack sx={styles.service}>
          <Text style={styles.serviceText}>Tuns</Text>
        </Stack>
      </Stack>
      <Stack align="start">
        <Stack
          direction="row"
          justify="start"
          sx={{ marginTop: 1.5, marginBottom: 5 }}
        >
          <Text style={styles.option}>{option.name}</Text>
          <Text style={styles.point}>{"\u2B24"}</Text>
          <Text style={{ color: grey0, fontSize: 16 }}>30 min</Text>
        </Stack>
        <Stack direction="row" justify="start" sx={{ marginBottom: 5 }}>
          <Text style={styles.label}>{t("available")}:</Text>
          <Text style={styles.availableText}>{expire}</Text>
        </Stack>
        {expirationTime && (
          <Stack direction="row" justify="start">
            <Text style={styles.label}>{t("expire")}:</Text>
            <Text style={styles.expireText}>{expire}</Text>
          </Stack>
        )}
      </Stack>
    </BottomSheetScrollView>
  );
};

export default memo(ProductSheet);

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20 },
  point: { fontSize: 3, color: grey0, marginHorizontal: 5 },
  productContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 1.5,
  },
  product: {
    color: "white",
    marginLeft: 5,
    fontWeight: "500",
  },
  name: {
    color: black,
    fontWeight: "500",
    fontSize: 20,
    marginTop: 10,
  },
  price: {
    color: grey0,
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textTransform: "lowercase",
  },
  priceDiscount: {
    color: black,
    fontSize: 20,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  discount: {
    marginLeft: 5,
    color: error,
    fontWeight: "500",
    fontSize: 12,
  },
  service: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceText: {
    color: black,
    fontWeight: "600",
    fontSize: 15,
  },
  option: {
    color: grey0,
    fontSize: 18,
  },
  label: {
    color: black,
    fontSize: 16,
    fontWeight: "500",
  },
  availableText: {
    marginLeft: 5,
    fontSize: 15,
    color: black,
    fontWeight: "600",
  },
  expireText: {
    marginLeft: 5,
    color: error,
    fontWeight: "600",
    fontSize: 15,
  },
});
