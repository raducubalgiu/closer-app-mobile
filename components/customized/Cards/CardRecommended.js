import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { AddressFormat, trimFunc } from "../../../utils";

const CardRecommended = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.cardItem}
        onPress={() =>
          navigation.navigate("ServiceItem", { serviceIde: props.id })
        }
      >
        <View style={styles.recommendItem}>
          <View>
            <Image
              style={styles.cardImage}
              source={{
                uri: `${props.image}`,
              }}
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardNameDistance}>
              <Text style={styles.cardName}>{props.name}</Text>
              <View style={styles.distanceContainer}>
                <Icon
                  style={{ marginRight: 5 }}
                  size={20}
                  color={theme.lightColors.grey0}
                  type="feather"
                  name="map-pin"
                />
                <Text style={styles.cardDistance}>
                  {props.distance < 1000
                    ? `la ${Math.round(props.distance)} m`
                    : `la ${Math.round(props.distance * 0.001)} km`}
                </Text>
              </View>
            </View>
            <Text style={styles.cardAddress}>
              {trimFunc(AddressFormat(props.address), 30)}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.cardTitle}>{props.service}</Text>
            </View>
            <View style={styles.ratingsContainer}>
              <Icon
                name="star"
                type="antdesign"
                size={16}
                color={theme.lightColors.primary}
              />
              <Text style={styles.cardRatingsAverage}>
                {props.ratingsAverage.toFixed(1)}
              </Text>
              <Text style={styles.cardRatingsQuantity}>
                {props.ratingsQuantity} {t("reviews")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

export default CardRecommended;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardItem: {
    paddingVertical: 15,
  },
  recommendItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 5,
  },
  cardImage: {
    flex: 1,
    width: 130,
    //resizeMode: "contain",
    borderRadius: 5,
  },
  cardInfo: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 10,
  },
  distanceContainer: { flexDirection: "row", alignItems: "center" },
  cardNameDistance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardName: {
    flex: 1,
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 14,
  },
  cardDistance: {
    fontSize: 12,
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
  },
  cardAddress: {
    fontSize: 12,
    marginTop: 2,
    color: theme.lightColors.grey0,
    fontFamily: "Exo-Medium",
  },
  cardTitle: {
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
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRatingsAverage: {
    marginLeft: 2,
    fontSize: 12,
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
  },
  cardRatingsQuantity: {
    marginLeft: 4,
    fontSize: 12,
    padding: 2,
    color: theme.lightColors.grey0,
    fontFamily: "Exo-Medium",
  },
});
