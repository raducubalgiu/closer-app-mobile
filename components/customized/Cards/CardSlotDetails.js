import { StyleSheet, Text } from "react-native";
import { Button, Stack, CustomAvatar } from "../../core";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

export const CardSlotDetails = ({
  startHour,
  channel,
  avatar,
  customer,
  product,
  option,
  price,
}) => {
  const { t } = useTranslation();
  const getBgColor = (channel) => {
    if (channel === "closer") {
      return "#fff5cc";
    } else if (channel === "admin") {
      return "#ccf2ff";
    } else {
      return "#c6ecc6";
    }
  };

  return (
    <Button>
      <Stack
        direction="row"
        align="start"
        justify="start"
        sx={styles.container}
      >
        <Text style={styles.startHour}>{startHour}</Text>
        <Stack
          align="start"
          sx={{ ...styles.slotDetails, backgroundColor: getBgColor(channel) }}
        >
          <Stack align="start" direction="row">
            <CustomAvatar avatar={avatar} size={22.5} iconSize={12.5} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.customer}>{customer}</Text>
              <Stack direction="row">
                <Text style={styles.product}>{product} -</Text>
                <Text style={styles.option}>{option}</Text>
              </Stack>
              <Stack direction="row" sx={{ marginTop: 15 }}>
                <Text style={styles.priceLabel}>{t("price")} -</Text>
                <Text style={styles.priceNo}>
                  {price} {t("ron")}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingTop: 25,
  },
  startHour: {
    color: theme.lightColors.black,
    fontSize: 14,
  },
  slotDetails: {
    marginLeft: 15,
    flex: 1,
    padding: 10,
  },
  customer: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 16.5,
    marginBottom: 2.5,
  },
  product: {
    color: theme.lightColors.black,
    fontSize: 15,
  },
  option: {
    color: theme.lightColors.black,
    marginLeft: 5,
    fontSize: 15,
  },
  priceLabel: {
    color: theme.lightColors.black,
    fontSize: 15,
  },
  priceNo: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 14.5,
    marginLeft: 5,
  },
});
