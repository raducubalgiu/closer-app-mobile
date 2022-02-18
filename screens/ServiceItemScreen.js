import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../assets/styles/Colors";
import BackButton from "../components/BackButton/BackButton";
import BottomSheetServiceItem from "../components/BottomSheets/BottomSheetServiceItem";

const ServiceItemScreen = () => {
  const height = Dimensions.get("window").height;

  return (
    <View style={styles.screen}>
      <BackButton />
      <View style={{ backgroundColor: "white" }}>
        <Image
          source={{
            uri: "https://stailer.ro/files/B-FKBMWJCR/S163274355071-thumb.jpg",
            height: height / 2.86,
          }}
        />
        {/* <View style={styles.businessDetailsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.businessName}>Sebastian Bajan Concept</Text>
            <View style={styles.ratingsContainer}>
              <Icon
                name="star"
                type="antdesign"
                color={Colors.yellowRatings}
                style={styles.favoritesStyle}
                size={20}
              />
              <Text style={styles.ratings}>4.5</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="enviromento"
                type="antdesign"
                color={Colors.textLight}
                size={20}
              />
              <Text
                style={{
                  flex: 1,
                  fontFamily: "Exo-Medium",
                  color: Colors.textLight,
                  marginLeft: 10,
                  fontSize: 15,
                }}
              >
                Drumul Fermei, nr 97, Popesti Leordeni, Ilfov
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Icon
                name="pushpino"
                type="antdesign"
                color={Colors.textLight}
                size={20}
              />
              <Text
                style={{
                  fontFamily: "Exo-Bold",
                  color: Colors.textLight,
                  marginLeft: 10,
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                la 5 km de tine
              </Text>
            </View>
          </View>
        </View> */}
      </View>
      <BottomSheetServiceItem />
    </View>
  );
};

export default ServiceItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  businessContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  businessName: {
    fontFamily: "Exo-Bold",
    fontSize: 20,
  },
  favoritesStyle: {
    padding: 5,
    borderRadius: 50,
  },
  businessDetailsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  ratingsContainer: { flexDirection: "row", alignItems: "center" },
  ratings: {
    fontFamily: "Exo-Bold",
    fontSize: 15,
  },
});
