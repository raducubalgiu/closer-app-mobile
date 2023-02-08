import { StyleSheet, Text } from "react-native";
import { memo } from "react";
import { Stack } from "../../core";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Product } from "../../../models/product";
import theme from "../../../assets/styles/theme";
import dayjs from "dayjs";
import { LastMinuteLabel } from "../Typography/Labels/LastMinuteLabel";
import { BookableLabel } from "../Typography/Labels/BookableLabel";

type IProps = { product: Product; expirationTime: any };
const { black, error, grey0 } = theme.lightColors || {};

const ProductSheet = ({ product, expirationTime }: IProps) => {
  const { t } = useTranslation();
  const {
    priceWithDiscount,
    price,
    name,
    discount,
    option,
    duration,
    serviceId,
  } = product;
  const expire = dayjs(expirationTime).utc().format("DD MMMM, HH:mm");

  return (
    <BottomSheetScrollView style={styles.container} bounces={false}>
      <Stack>
        {expirationTime && (
          <LastMinuteLabel size="md" text={t("lastMinuteOffer")} />
        )}
        {!expirationTime && (
          <BookableLabel size="md" text={t("bookableOffer")} />
        )}
      </Stack>
      <Stack sx={{ marginTop: 5 }}>
        <Text style={styles.name}>{name}</Text>
        {discount > 0 && (
          <Text style={styles.price}>
            {price} {t("lei")}
          </Text>
        )}
        <Stack direction="row" sx={{ marginTop: 5 }}>
          <Text style={styles.priceDiscount}>
            {priceWithDiscount} {t("lei")}
          </Text>
          {discount > 0 && <Text style={styles.discount}>(-{discount}%)</Text>}
        </Stack>
      </Stack>
      <Stack align="start">
        <Stack sx={styles.service}>
          <Text style={styles.serviceText}>{serviceId?.name}</Text>
        </Stack>
      </Stack>
      <Stack align="start">
        <Stack direction="row" justify="start" sx={{ marginBottom: 10 }}>
          <Text style={styles.label}>{t("category")}:</Text>
          <Text style={styles.labelText}>{option?.name}</Text>
        </Stack>
        <Stack direction="row" justify="start" sx={{ marginBottom: 10 }}>
          <Text style={styles.label}>{t("duration")}:</Text>
          <Text style={styles.labelText}>30 min</Text>
        </Stack>
        <Stack direction="row" justify="start" sx={{ marginBottom: 10 }}>
          <Text style={styles.label}>{t("available")}:</Text>
          <Text style={styles.availableText}>
            {expirationTime ? expire : t("checkCalendar")}
          </Text>
        </Stack>
      </Stack>
    </BottomSheetScrollView>
  );
};

export default memo(ProductSheet);

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20 },
  point: { fontSize: 3, color: grey0, marginHorizontal: 5 },
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
    marginVertical: 15,
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
  labelText: {
    color: grey0,
    fontSize: 18,
  },
  label: {
    color: black,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 5,
  },
  availableText: {
    fontSize: 16,
    color: black,
    fontWeight: "600",
    flex: 1,
  },
});
