import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { trimFunc, AddressFormat } from "../../../utils";

export const CardLocation = ({ location }) => {
  const {
    _id,
    images,
    name,
    counter,
    minPrice,
    distance,
    location: address,
  } = location;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToUser = () => navigation.push("LocationItem", { locationId: _id });

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={goToUser}
    >
      <View style={styles.cardHeader}>
        <Image
          style={styles.cardImage}
          source={{
            uri: images[0]?.url,
          }}
        />
        <Icon
          name="video"
          type="feather"
          containerStyle={styles.iconVideo}
          color="white"
          size={18}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardContentFlex}>
          <Text style={styles.business}>{name}</Text>
          <Text style={styles.address}>
            {trimFunc(AddressFormat(address), 60)}{" "}
          </Text>
          <View style={styles.ratingsContainer}>
            <Icon
              name="star"
              type="antdesign"
              size={17}
              color={theme.lightColors.primary}
            />
            <Text style={styles.ratingsAverage}>
              {counter[0]?.ratingsAverage?.toFixed(1)}
            </Text>
            <Text style={styles.ratingsQuantity}>
              {counter[0]?.ratingsQuantity} {t("reviews")}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>de la</Text>
            <Text style={styles.price}>{minPrice} Lei</Text>
          </View>
        </View>
        <View style={styles.distanceContainer}>
          <Icon
            name="map-pin"
            type="feather"
            size={20}
            color={theme.lightColors.black}
          />
          <Text style={styles.distance}>
            {distance < 1
              ? `la mai putin de 1 km`
              : `la ${Math.round(distance)} km de tine`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
  },
  cardHeader: {},
  cardImage: {
    flex: 1,
    width: 110,
    minHeight: 150,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  cardContentFlex: {},
  business: {
    fontSize: 16,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
  },
  address: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    marginTop: 1,
    fontSize: 13,
  },
  ratingsContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  ratingsAverage: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 2.5,
  },
  ratingsQuantity: {
    fontFamily: "Exo-Medium",
    marginLeft: 7.5,
    fontSize: 12,
    color: theme.lightColors.grey0,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    backgroundColor: "#f1f1f1",
    padding: 5,
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  price: {
    fontFamily: "Exo-Bold",
    fontSize: 15,
    marginLeft: 5,
  },
  priceLabel: {
    fontFamily: "Exo-Regular",
    fontSize: 12,
  },
  warning: {
    marginTop: 5,
    fontFamily: "Exo-Regular",
    fontSize: 13,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  distance: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 5,
    fontSize: 13,
    color: theme.lightColors.black,
  },
  iconVideo: {
    position: "absolute",
    bottom: 5,
    left: 10,
    zIndex: 1000,
  },
});
