import { StyleSheet, Text, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, IconLocation, IconStar, IconVideo, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { AddressFormat, trimFunc } from "../../../utils";

const { width } = Dimensions.get("window");

export const CardRecommended = ({ location }) => {
  const { images, name, distance, services, counter } = location;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToUser = () =>
    navigation.push("LocationItem", { location, distance });

  return (
    <Button sx={styles.button} onPress={goToUser}>
      <Stack direction="row" sx={styles.item}>
        <Stack>
          <Image
            style={styles.image}
            source={{
              uri: `${images[0]?.url}`,
            }}
          />
          <IconVideo sx={styles.iconVideo} />
        </Stack>
        <Stack align="start" sx={styles.info}>
          <Stack direction="row">
            <Text style={styles.name}>{name}</Text>
            <Stack direction="row">
              <IconLocation sx={{ marginRight: 5 }} />
              <Text style={styles.distance}>
                {distance < 1000
                  ? `${t("at")} ${Math.round(distance)} m`
                  : `${t("at")} ${Math.round(distance * 0.001)} km`}
              </Text>
            </Stack>
          </Stack>
          <Text style={styles.address}>
            {trimFunc(AddressFormat(location?.location), 30)}
          </Text>
          <Stack direction="row">
            <Text style={styles.service}>{services[0]?.name}</Text>
          </Stack>
          <Stack direction="row" align="center">
            <IconStar />
            <Text style={styles.ratingsAvg}>
              {counter?.ratingsAverage.toFixed(1)}
            </Text>
            <Text style={styles.ratingsQuant}>
              {counter?.ratingsQuantity} {t("reviews")}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
  },
  item: {
    borderRadius: 5,
  },
  image: {
    flex: 1,
    borderRadius: 5,
    resizeMode: "cover",
    width: width / 3,
  },
  info: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 10,
  },
  name: {
    flex: 1,
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 14,
    textTransform: "capitalize",
  },
  distance: {
    fontSize: 12,
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
  },
  address: {
    fontSize: 12,
    marginTop: 2,
    color: theme.lightColors.grey0,
    fontSize: 13,
  },
  service: {
    fontSize: 11,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
  },
  ratingsAvg: {
    marginLeft: 2,
    fontSize: 13,
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
  },
  ratingsQuant: {
    marginLeft: 4,
    fontSize: 13,
    padding: 2,
    color: theme.lightColors.grey0,
  },
  iconVideo: {
    position: "absolute",
    bottom: 5,
    left: 10,
    zIndex: 1000,
  },
});
