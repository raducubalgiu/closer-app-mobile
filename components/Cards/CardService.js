import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../assets/styles/Colors";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const CardService = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ServiceItem", { serviceId: props.id })
      }
    >
      <View style={styles.cardHeader}>
        <Image
          style={styles.cardImage}
          source={{
            uri: props.image,
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardContentFlex}>
          <Text style={styles.business}>{props.business}</Text>
          <Text style={styles.address}>{props.address} </Text>
          <View style={styles.ratingsContainer}>
            <Icon name="star" type="antdesign" size={15} color="#ffba00" />
            <Text style={styles.ratingsAverage}>{props.ratingsAverage}</Text>
            <Text style={styles.ratingsQuantity}>
              {props.ratingsQuantity} de recenzii
            </Text>
          </View>
          <View style={styles.serviceContainer}>
            <Text style={styles.service}>{props.service}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>de la</Text>
            <Text style={styles.price}>50 Lei</Text>
          </View>
          {/* <Text style={styles.warning}>
            Grabeste-te! Au mai ramas 1 locuri libere
          </Text> */}
        </View>
        <View style={styles.distanceContainer}>
          <Icon name="location-on" size={15} color={Colors.yellowRatings} />
          <Text style={styles.distance}>
            la {Math.round(props.distance)} km de tine
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardService;

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
    fontFamily: "Exo-ExtraBold",
    color: Colors.textDark,
  },
  address: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textLight,
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
    color: Colors.textLight,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  service: {
    fontFamily: "Exo-Bold",
    backgroundColor: "#f1f1f1",
    padding: 5,
    fontSize: 12.5,
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
    marginLeft: 2.5,
    fontSize: 13,
    color: Colors.textDark,
  },
});
