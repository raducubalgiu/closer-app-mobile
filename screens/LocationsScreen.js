import { SafeAreaView, StyleSheet, View, FlatList, Text } from "react-native";
import React, { useState, useCallback } from "react";
import moment from "moment";
import {
  HeaderServices,
  CardLocation,
  Map,
  SheetService,
  FilterPriceModal,
  FilterDistanceModal,
  FilterRatingModal,
} from "../components/customized";
import { useHttpGet } from "../hooks";

const LocationsScreen = ({ route }) => {
  const { service, option, period } = route.params;
  const { startDate, endDate } = period;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);
  const latlng = "26.100195,44.428286";
  //const [results, setResults] = useState(0);
  const [checked, setChecked] = useState(true);
  const [visible, setVisible] = useState({
    price: false,
    distance: false,
    rating: false,
  });
  const NOW = moment.utc();

  let customPeriod;
  switch (period.code) {
    case 0:
      customPeriod = { ...period };
      break;
    case 1:
      customPeriod = {
        ...period,
        startDate: moment().utc(NOW),
        endDate: moment().utc(NOW).add(3, "hours"),
      };
      break;
    case 2:
      customPeriod = {
        ...period,
        startDate: moment.utc(startDate),
        endDate: moment.utc(endDate),
      };
      break;
    default:
      customPeriod = { ...period };
  }

  const { data: locations, loading } = useHttpGet(
    `/locations?latlng=${latlng}&serviceId=${service?._id}&option=${option?._id}&minprice=${minPrice}&maxprice=${maxPrice}&mindistance=${minDistance}&maxdistance=${maxDistance}`
  );

  const renderLocation = useCallback(
    ({ item }) => (
      <CardLocation
        location={item}
        service={service}
        option={option}
        distance={item.distance}
      />
    ),
    []
  );
  const toggleSwitch = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const list = (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={locations}
        keyExtractor={(item) => item._id}
        renderItem={renderLocation}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FilterPriceModal
        visible={visible.price}
        onClose={() => setVisible({ ...visible, price: false })}
      />
      <FilterDistanceModal
        visible={visible.distance}
        onClose={() => setVisible({ ...visible, distance: false })}
      />
      <FilterRatingModal
        visible={visible.rating}
        onClose={() => setVisible({ ...visible, rating: false })}
      />
      <HeaderServices
        period={period}
        onToggleSwitch={toggleSwitch}
        serviceName={service?.name}
        checked={checked}
        onDisplayPrice={() => setVisible({ ...visible, price: true })}
        onDisplayDistance={() => setVisible({ ...visible, distance: true })}
        onDisplayRating={() => setVisible({ ...visible, rating: true })}
      />
      {!checked && list}
      {checked && (
        <>
          <Map locations={locations} serviceName={service?.name} />
          <SheetService
            list={list}
            results={locations?.length === 0 ? 0 : locations.length}
            serviceName={service?.name}
            loading={loading}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
