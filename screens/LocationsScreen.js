import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../hooks/auth";
import {
  HeaderServices,
  CardLocation,
  Map,
  SheetService,
} from "../components/customized";

const LocationsScreen = (props) => {
  const { serviceId, serviceName, optionId, period } = props.route.params;
  const { user } = useAuth();
  const [results, setResults] = useState(null);
  const [locations, setLocations] = useState([]);
  const [checked, setChecked] = useState(true);

  const fetchLocations = useCallback(() => {
    if (period.code === process.env.ANYTIME_CODE) {
      axios
        .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}/users`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setLocations(res.data.users);
          setResults(res.data.results);
        })
        .catch((error) => console.log(error));
    } else if (period.code === process.env.CALENDAR_CODE) {
      axios
        .get(
          `${process.env.BASE_ENDPOINT}/users/get-by-distance?latlng=26.100195,44.428286&serviceId=${serviceId}&option=${optionId}`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          setLocations(res.data.services);
          setResults(res.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [serviceId, serviceName, optionId, period]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

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
        onToggleSwitch={toggleSwitch}
        period={period}
        serviceName={serviceName}
        checked={checked}
      />
      {!checked && list}
      {checked && (
        <>
          <Map locations={locations} serviceName={serviceName} />
          <SheetService
            list={list}
            results={locations.length === 0 ? 0 : results}
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
