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
import { Icon, Switch, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import BottomSheetService from "../components/customized/BottomSheets/BottomSheetService";
import CardService from "../components/customized/Cards/CardService";
import Map from "../components/customized/Map/Map";
import theme from "../assets/styles/theme";
import { useAuth } from "../context/auth";
import { AddressFormat } from "../utils/addressFormat";

const ServicesScreen = ({ route }) => {
  const { user } = useAuth();
  const [results, setResults] = useState(null);
  const [locations, setLocations] = useState([]);
  const [checked, setChecked] = useState(true);
  const [sheetStep, setSheetStep] = useState(0);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { serviceId, serviceName, optionId } = route.params;

  const handleSheetChange = useCallback((index) => {
    setSheetStep(index);
  }, []);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const fetchLocations = useCallback(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/get-by-distance?latlng=26.100195,44.428286&serviceId=${serviceId}&option=${optionId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((resp) => {
        setLocations(resp.data.services);
        setResults(resp.data.results);
      })
      .catch((error) => console.log(error));
  }, [serviceId]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.servicesHeader}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icon
              name="keyboard-arrow-left"
              size={30}
              color={theme.lightColors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchDetailContainer}>
            <Icon name="search" size={18} color={theme.lightColors.grey0} />
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
            <Icon name="keyboard-arrow-down" color={theme.lightColors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondFilter}>
            <Text style={styles.filterText}>{t("distance")}</Text>
            <Icon name="keyboard-arrow-down" color={theme.lightColors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondFilter}>
            <Text style={styles.filterText}>{t("rating")}</Text>
            <Icon name="keyboard-arrow-down" color={theme.lightColors.black} />
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
              keyExtractor={(item) => item.products?._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <>
                  <CardService
                    id={item?._id}
                    distance={item?.distance}
                    image={item?.images[0]?.url}
                    business={item?.name}
                    address={AddressFormat(item?.location)}
                    ratingsAverage={item?.counter[0]?.ratingsAverage}
                    ratingsQuantity={item?.counter[0]?.ratingsQuantity}
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
    paddingHorizontal: 15,
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
    color: theme.lightColors.black,
  },
  searchText: {
    fontFamily: "Exo-Medium",
    marginLeft: 5,
    color: theme.lightColors.grey0,
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
