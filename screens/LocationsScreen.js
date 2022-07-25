import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import {
  HeaderServices,
  CardLocation,
  Map,
  SheetService,
} from "../components/customized";
import { useHttpGet } from "../hooks";

const LocationsScreen = ({ route }) => {
  const { serviceId, serviceName, optionId, startDate, endDate } = route.params;
  const [results, setResults] = useState(0);
  const [checked, setChecked] = useState(true);

  const { data: locations } = useHttpGet(
    `/users/get-by-distance?latlng=26.100195,44.428286&serviceId=${serviceId}&option=${optionId}`
  );

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
