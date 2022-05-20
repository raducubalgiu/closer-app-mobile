import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Divider } from "@rneui/themed";
import BottomSheetService from "../components/customized/BottomSheets/BottomSheetService";
import Map from "../components/customized/Map/Map";
import { useAuth } from "../hooks/auth";
import { HeaderServices, CardLocation } from "../components/customized";

const LocationsScreen = (props) => {
  const { serviceId, serviceName, optionId, period } = props.route.params;
  const { user } = useAuth();
  const [results, setResults] = useState(null);
  const [locations, setLocations] = useState([]);
  const [checked, setChecked] = useState(true);
  const [sheetStep, setSheetStep] = useState(0);

  const handleSheetChange = useCallback((index) => {
    setSheetStep(index);
  }, []);

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

  const renderLocation = ({ item }) => (
    <>
      <CardLocation location={item} service={serviceName} />
      <Divider />
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderServices
        onToggleSwitch={() => setChecked(!checked)}
        period={period}
        serviceName={serviceName}
      />
      {checked && (
        <>
          <Map
            locations={locations}
            serviceName={serviceName}
            sheetStep={sheetStep}
          />
          <BottomSheetService
            data={locations}
            results={locations.length === 0 ? 0 : results}
            serviceName={serviceName}
            onHandleSheetChange={handleSheetChange}
          />
        </>
      )}
      {!checked && (
        <View>
          <FlatList
            data={locations}
            keyExtractor={(item) => item.products?._id}
            showsVerticalScrollIndicator={false}
            renderItem={renderLocation}
          />
        </View>
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
