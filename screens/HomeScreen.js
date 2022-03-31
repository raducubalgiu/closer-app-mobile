import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-elements";
import FakeSearchBar from "../components/customized/FakeSearchBar/FakeSearchBar";
import ServicesCategories from "../components/customized/ServicesCategories/ServicesCategories";
import CardRecommended from "../components/customized/Cards/CardRecommended";
import { Colors } from "../assets/styles/Colors";
import { useAuth } from "../context/auth";

const HomeScreen = () => {
  const height = Dimensions.get("window").height;
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.2:8000/api/v1/locations/get-recommended?latlng=26.100195,44.428286`
      )
      .then((resp) => {
        setLocations(resp.data.services);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <FakeSearchBar />
      </SafeAreaView>

      <FlatList
        ListHeaderComponent={
          <>
            <ServicesCategories />
            <View style={{ backgroundColor: "white", borderTopLeftRadius: 20 }}>
              <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
              <Divider width={2} color="#f1f1f1" style={styles.divider} />
            </View>
          </>
        }
        data={locations}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardRecommended
            id={item._id}
            name={item.name}
            image={item.imageCover[0].url}
            title={item.title}
            street={item.startLocation.address.street}
            number={item.startLocation.address.number}
            county={item.startLocation.address.county}
            distance={item.distance}
            ratingsAverage={item.ratingsAverage}
            ratingsQuantity={item.ratingsQuantity}
            availableSeats={item.availableSeats}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  sheetHeading: {
    paddingVertical: 15,
    paddingLeft: 15,
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  divider: { paddingBottom: 5, marginBottom: 5 },
  bottomSheet: {
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
});

export default HomeScreen;
