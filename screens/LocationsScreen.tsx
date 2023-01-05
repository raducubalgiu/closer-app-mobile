import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as Location from "expo-location";
import {
  HeaderServices,
  Map,
  SheetService,
  FilterPriceModal,
  FilterDistanceModal,
  FilterRatingModal,
  NoFoundMessage,
  LocationListItem,
} from "../components/customized";
import { useGet } from "../hooks";
import theme from "../assets/styles/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { useFocusEffect } from "@react-navigation/native";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Locations">;

export const LocationsScreen = ({ route }: IProps) => {
  const { service, option, period } = route.params;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);
  const latlng = "26.100195,44.428286";
  const [checked, setChecked] = useState(true);
  const [location, setLocation] = useState<any>(null);
  const { longitude, latitude } = location?.coords || {};
  const [visible, setVisible] = useState({
    price: false,
    distance: false,
    rating: false,
  });
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      try {
        const fetchUserLocation = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            //setErrorMsg("Permission to access location was denied");
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        };

        fetchUserLocation();

        return () => {
          isActive = false;
        };
      } catch (err) {}
    }, [])
  );

  const { data: locations } = useGet({
    model: "locations",
    uri: `/locations?latlng=${longitude},${latitude}&serviceId=${service?.id}&option=${option?._id}&minprice=${minPrice}&maxprice=${maxPrice}&mindistance=${minDistance}&maxdistance=${maxDistance}&minrating=0&maxrating=5&page=1&limit=25`,
  });

  const renderLocation = useCallback(({ item }: ListRenderItemInfo<any>) => {
    return (
      <LocationListItem
        location={item}
        service={service}
        option={option}
        moreProducts={item.products.length > 1}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: any) => item.id, []);
  const toggleSwitch = useCallback(() => setChecked(!checked), [checked]);

  let footer;
  if (locations && locations.length === 0) {
    footer = (
      <NoFoundMessage
        title={service.name}
        description={t("noFoundLocations")}
      />
    );
  }

  const list = (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={locations}
        keyExtractor={keyExtractor}
        renderItem={renderLocation}
        bounces={false}
        ListFooterComponent={footer}
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
        onHandleDistance={() => {
          setMaxDistance(50000);
          setVisible({ ...visible, distance: false });
        }}
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
      {checked && (
        <>
          {latitude && longitude && (
            <Map
              locations={locations}
              serviceName={service?.name}
              initialLatitude={latitude}
              initialLongitude={longitude}
            />
          )}
          <SheetService>
            <View style={{ height: 50 }}>
              <Text style={styles.sheetHeading}>
                {locations && locations?.length} rezultate
              </Text>
            </View>
            {list}
          </SheetService>
        </>
      )}
      {!checked && list}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  sheetHeading: {
    color: black,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
});
