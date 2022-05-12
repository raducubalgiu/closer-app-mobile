import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { Button, Stack } from "../../core";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { AddressFormat, trimFunc } from "../../../utils";

const width = Dimensions.get("window").width;

const CardRecommended = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToUser = () =>
    navigation.navigate("ServiceItem", { serviceIde: props.id });

  return (
    <Button sx={styles.button} onPress={goToUser}>
      <Stack direction="row" sx={styles.item}>
        <Stack>
          <Image
            style={styles.cardImage}
            source={{
              uri: `${props.image}`,
            }}
          />
          <Icon
            name="video"
            type="feather"
            containerStyle={styles.iconVideo}
            color="white"
            size={18}
          />
        </Stack>
        <Stack align="start" sx={styles.info}>
          <Stack direction="row">
            <Text style={styles.name}>{props.name}</Text>
            <Stack direction="row">
              <Icon
                style={{ marginRight: 5 }}
                size={20}
                color={theme.lightColors.grey0}
                type="feather"
                name="map-pin"
              />
              <Text style={styles.distance}>
                {props.distance < 1000
                  ? `la ${Math.round(props.distance)} m`
                  : `la ${Math.round(props.distance * 0.001)} km`}
              </Text>
            </Stack>
          </Stack>
          <Text style={styles.address}>
            {trimFunc(AddressFormat(props.address), 30)}
          </Text>
          <Stack direction="row">
            <Text style={styles.service}>{props.service}</Text>
          </Stack>
          <Stack direction="row">
            <Icon
              name="star"
              type="antdesign"
              size={16}
              color={theme.lightColors.primary}
            />
            <Text style={styles.ratingsAvg}>
              {props.ratingsAverage.toFixed(1)}
            </Text>
            <Text style={styles.ratingsQuant}>
              {props.ratingsQuantity} {t("reviews")}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

export default CardRecommended;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
  },
  item: {
    borderRadius: 5,
  },
  cardImage: {
    flex: 1,
    width: width / 3,
    borderRadius: 5,
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
    fontFamily: "Exo-Medium",
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
    fontSize: 12,
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
  },
  ratingsQuant: {
    marginLeft: 4,
    fontSize: 12,
    padding: 2,
    color: theme.lightColors.grey0,
    fontFamily: "Exo-Medium",
  },
  iconVideo: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1000,
  },
});
