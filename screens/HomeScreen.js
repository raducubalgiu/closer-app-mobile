import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-elements";
import FakeSearchBar from "../components/customized/FakeSearchBar/FakeSearchBar";
import ServicesCategories from "../components/customized/ServicesCategories/ServicesCategories";
import CardRecommended from "../components/customized/Cards/CardRecommended";
import { Colors } from "../assets/styles/Colors";
import { useAuth } from "../context/auth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchRecommended = useCallback(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/get-recommended?latlng=26.100195,44.428286`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((resp) => {
        setLocations(resp.data.services);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchRecommended();
  }, [fetchRecommended]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  console.log(locations);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <FakeSearchBar />
      </SafeAreaView>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            id={item?._id}
            name={item?.name}
            image={item?.images[0]?.url}
            title={item?.title}
            street={item?.location?.street}
            number={item?.location?.number}
            county={item?.location?.county}
            distance={item?.distance}
            ratingsAverage={item?.ratingsAverage}
            ratingsQuantity={item?.ratingsQuantity}
            availableSeats={item?.availableSeats}
            service={item?.services[0]?.name}
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
