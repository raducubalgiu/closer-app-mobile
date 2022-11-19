import { SafeAreaView, StyleSheet, View, FlatList, Text } from "react-native";
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  HeaderServices,
  CardLocation,
  Map,
  SheetService,
  FilterPriceModal,
  FilterDistanceModal,
  FilterRatingModal,
  NoFoundMessage,
} from "../components/customized";
import { useGet } from "../hooks";
import theme from "../assets/styles/theme";

const { black } = theme.lightColors;

export const LocationsScreen = ({ route }) => {
  const { service, option, period } = route.params;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);
  const latlng = "26.100195,44.428286";
  const [checked, setChecked] = useState(true);
  const [visible, setVisible] = useState({
    price: false,
    distance: false,
    rating: false,
  });
  const { t } = useTranslation();

  const { data: locations } = useGet({
    model: "locations",
    uri: `/locations?latlng=26.100195,44.428286&serviceId=${service?._id}&option=${option?._id}&minprice=${minPrice}&maxprice=${maxPrice}&mindistance=${minDistance}&maxdistance=${maxDistance}&minrating=0&maxrating=5&page=1&limit=5`,
  });

  const renderLocation = useCallback(({ item }) => {
    return (
      <CardLocation
        location={item}
        service={service}
        option={option}
        moreProducts={item.products.length > 1}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item._id, []);
  const toggleSwitch = useCallback(() => setChecked(!checked), [checked]);

  const noFoundLocations = (
    <NoFoundMessage title={service.name} description={t("noFoundLocations")} />
  );

  const list = (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={locations}
        keyExtractor={keyExtractor}
        renderItem={renderLocation}
        bounces={false}
        ListFooterComponent={!locations?.length && noFoundLocations}
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
          <Map locations={locations} serviceName={service?.name} />
          <SheetService>
            <View style={{ height: 50 }}>
              <Text style={styles.sheetHeading}>
                {locations?.length} rezultate
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
