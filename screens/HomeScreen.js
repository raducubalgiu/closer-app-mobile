import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import FakeSearchBar from "../components/customized/FakeSearchBar/FakeSearchBar";
import ServicesCategories from "../components/customized/ServicesCategories/ServicesCategories";
import CardRecommended from "../components/customized/Cards/CardRecommended";
import theme from "../assets/styles/theme";
import { useAuth } from "../context/auth";
import { useScrollToTop } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef(null);

  useScrollToTop(ref);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const renderRecommended = ({ item }) => {
    const { images, counter } = item;

    return (
      <CardRecommended
        id={item?._id}
        name={item?.name}
        image={images[0]?.url}
        title={item?.title}
        address={item?.location}
        distance={item?.distance}
        ratingsAverage={counter[0]?.ratingsAverage}
        ratingsQuantity={counter[0]?.ratingsQuantity}
        availableSeats={item?.availableSeats}
        service={item?.services[0]?.name}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <FakeSearchBar />
        <FlatList
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <>
              <ServicesCategories />
              <View>
                <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
                <Divider width={2} color="#f1f1f1" style={styles.divider} />
              </View>
            </>
          }
          data={locations}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderRecommended}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  sheetHeading: {
    paddingVertical: 15,
    color: theme.lightColors.black,
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
