import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CardPriceItem from "./CardPriceItem";
import { useTranslation } from "react-i18next";

const CardPriceHeader = (props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.personContainer}>
        <Avatar
          size={65}
          rounded
          source={{
            uri: props.personImage,
          }}
          title="Bj"
          containerStyle={{ backgroundColor: "grey" }}
        ></Avatar>
        <View style={styles.personDetails}>
          <Text style={styles.personName}>{props.personName}</Text>
          <View style={styles.personJobContainer}>
            <Text style={styles.personJob}>{props.personJob}</Text>
            <Icon
              name="star"
              type="antdesign"
              color={Colors.yellowRatings}
              size={17}
            />
            <Text style={styles.personRatings}>
              {props.personRatingsAverage} ({props.personRatingsQuantity})
            </Text>
          </View>
          <Text style={styles.seeMore}>{t("seeProfile")}</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={props.services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <>
            <Divider />
            <CardPriceItem
              serviceTitle={item.serviceTitle}
              gender={item.gender}
              serviceDescription={item.description}
              servicePrice={item.servicePrice}
            />
          </>
        )}
      />
    </View>
  );
};

export default CardPriceHeader;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  personDetails: {
    marginLeft: 10,
    paddingVertical: 15,
  },
  personName: {
    fontFamily: "Exo-Bold",
    fontSize: 18,
    marginRight: 5,
  },
  personJobContainer: { flexDirection: "row", alignItems: "center" },
  personJob: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 15,
    marginRight: 5,
  },
  personRatings: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 2.5,
    fontSize: 13,
  },
  seeMore: {
    color: Colors.yellowRatings,
    fontFamily: "Exo-Bold",
    marginTop: 2.5,
    fontSize: 14,
  },
});
