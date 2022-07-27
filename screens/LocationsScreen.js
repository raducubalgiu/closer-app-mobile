import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  HeaderServices,
  CardLocation,
  Map,
  SheetService,
} from "../components/customized";

const LocationsScreen = ({ route }) => {
  const { serviceId, serviceName, optionId, period } = route.params;
  const { startDate, endDate } = period;
  const [results, setResults] = useState(0);
  const [checked, setChecked] = useState(true);
  const [locations, setLocations] = useState([]);
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

  useEffect(() => {
    axios
      .post(`${process.env.BASE_ENDPOINT}/users/get-by-distance`, {
        latlng: "26.100195,44.428286",
        serviceId,
        option: optionId,
        start: customPeriod.startDate,
        end: customPeriod.endDate,
      })
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  }, []);

  const renderLocation = useCallback(
    ({ item }) => (
      <CardLocation
        location={item}
        service={serviceName}
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
      <HeaderServices
        period={period}
        onToggleSwitch={toggleSwitch}
        serviceName={serviceName}
        checked={checked}
      />
      {!checked && list}
      {checked && (
        <>
          <Map locations={locations} serviceName={serviceName} />
          <SheetService
            list={list}
            results={locations?.length === 0 ? 0 : results}
            serviceName={serviceName}
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
