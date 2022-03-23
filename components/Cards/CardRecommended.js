import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-elements";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const CardRecommended = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
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
                uri: props.image,
              }}
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardNameDistance}>
              <Text style={styles.cardName}>{props.name}</Text>
              <View style={styles.distanceContainer}>
                <Icon
                  style={{ marginRight: 3 }}
                  size={15}
                  color={Colors.primary}
                  name="location-pin"
                />
                <Text style={styles.cardDistance}>
                  {props.distance < 1000
                    ? `la ${Math.round(props.distance)} m`
                    : `la ${Math.round(props.distance * 0.001)} km`}
                </Text>
              </View>
            </View>
            <Text style={styles.cardAddress}>
              {props.street}, {props.number}, {props.county}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.cardTitle}>Tuns</Text>
            </View>
            <View style={styles.ratingsContainer}>
              <Icon name="star" type="antdesign" size={15} color="#ffba00" />
              <Text style={styles.cardRatingsAverage}>
                {props.ratingsAverage}
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
  },
  cardItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  recommendItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    //alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#f1f1f1",
    borderRadius: 5,
  },
  cardImage: {
    flex: 1,
    width: 120,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
    // borderTopRightRadius: 5,
    // borderBottomRightRadius: 5,
    //resizeMode: "contain",
  },
  cardInfo: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  distanceContainer: { flexDirection: "row", alignItems: "center" },
  cardNameDistance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardName: {
    flex: 1,
    color: Colors.textDark,
    fontFamily: "Exo-Bold",
    fontSize: 14,
  },
  cardDistance: {
    fontSize: 13,
    fontFamily: "Exo-Bold",
    color: Colors.textDark,
  },
  cardAddress: {
    fontSize: 13,
    marginTop: 2,
    color: Colors.textLight,
    fontFamily: "Exo-Medium",
  },
  cardTitle: {
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#f1f1f1",
    padding: 2,
    color: Colors.textDark,
    fontFamily: "Exo-Bold",
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRatingsAverage: {
    marginLeft: 2,
    fontSize: 12,
    fontFamily: "Exo-Medium",
  },
  cardRatingsQuantity: {
    marginLeft: 4,
    fontSize: 12,
    padding: 2,
    color: Colors.textLight,
    fontFamily: "Exo-Medium",
  },
});
