import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Switch } from "react-native-elements";
import { Colors } from "../assets/styles/Colors";
import BottomSheetService from "../components/BottomSheets/BottomSheetService";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CardService from "../components/Cards/CardService";
import Map from "../components/Map/Map";

const ServicesScreen = ({ route }) => {
  const [results, setResults] = useState(null);
  const [locations, setLocations] = useState([]);
  const [checked, setChecked] = useState(true);
  const [sheetStep, setSheetStep] = useState(0);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { serviceId, serviceName, option } = route.params;

  const handleSheetChange = useCallback((index) => {
    setSheetStep(index);
  }, []);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.2:8000/api/v1/locations/get-by-distance?serviceId=${serviceId}&latlng=26.100195,44.428286`
      )
      .then((resp) => {
        setLocations(resp.data.services);
        setResults(resp.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.servicesHeader}>
          <TouchableOpacity onPress={() => navigation.navigate("StackBase")}>
            <Icon name="keyboard-arrow-left" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchDetailContainer}>
            <Icon name="search" size={18} color={Colors.textLight} />
            <Text style={styles.serviceText}>{serviceName},</Text>
            <Text style={styles.searchText}>6 feb, 16:30</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondFilterContainer}>
          <Switch
            value={checked}
            onValueChange={toggleSwitch}
            color="#f1f1f1"
          />
          <TouchableOpacity style={styles.secondFilter}>
            <Text style={styles.filterText}>{t("price")}</Text>
            <Icon name="keyboard-arrow-down" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondFilter}>
            <Text style={styles.filterText}>{t("distance")}</Text>
            <Icon name="keyboard-arrow-down" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondFilter}>
            <Text style={styles.filterText}>{t("rating")}</Text>
            <Icon name="keyboard-arrow-down" />
          </TouchableOpacity>
        </View>
        <Divider />
        {checked && (
          <>
            <Map
              locations={locations}
              serviceName={serviceName}
              sheetStep={sheetStep}
            />
            <BottomSheetService
              data={locations}
              results={results}
              serviceName={serviceName}
              onHandleSheetChange={handleSheetChange}
            />
          </>
        )}
        {!checked && (
          <View>
            <FlatList
              data={locations}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <>
                  <CardService
                    id={item._id}
                    distance={item.distance}
                    image={item.imageCover[0].url}
                    business={item.name}
                    address={`${item.startLocation.address.street}, ${item.startLocation.address.number}, ${item.startLocation.address.county}`}
                    ratingsAverage={item.ratingsAverage}
                    ratingsQuantity={item.ratingsQuantity}
                    service={serviceName}
                  />
                  <Divider />
                </>
              )}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  servicesHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 15,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  searchDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: 20,
  },
  serviceText: {
    fontFamily: "Exo-Bold",
    marginLeft: 10,
    color: Colors.darkLight,
  },
  searchText: {
    fontFamily: "Exo-Medium",
    marginLeft: 5,
    color: Colors.textLight,
  },
  secondFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingBottom: 15,
    overflow: "scroll",
  },
  secondFilter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  filterText: {
    fontFamily: "Exo-Medium",
  },
});
