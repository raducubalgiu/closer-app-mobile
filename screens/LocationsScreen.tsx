import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  Dimensions,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderServices, Map, NoFoundMessage } from "../components/customized";
import LocationListItem from "../components/customized/ListItems/LocationListItem";
import { useGet } from "../hooks";
import theme from "../assets/styles/theme";
import { RootStackParams } from "../navigation/rootStackParams";
import { Location } from "../models/location";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Icon } from "@rneui/themed";
import { Spinner, Stack } from "../components/core";

const { black, primary } = theme.lightColors || {};
const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "Locations">;

export const LocationsScreen = ({ route }: IProps) => {
  const { service, option, period, longitude, latitude } = route.params;
  const sheetRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const fullHeight = height - insets.top - insets.bottom + 40;
  const snapPoints = useMemo(() => [90, fullHeight], []);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);
  const { t } = useTranslation();

  const {
    data: locations,
    isLoading,
    isFetching,
  } = useGet({
    model: "locations",
    uri: `/locations?latlng=${longitude},${latitude}&serviceId=${service?.id}&option=${option?._id}&minprice=${minPrice}&maxprice=${maxPrice}&mindistance=${minDistance}&maxdistance=${maxDistance}&minrating=0&maxrating=5&page=1&limit=25`,
  });

  const renderLocation = useCallback(
    ({ item }: ListRenderItemInfo<Location>) => {
      return (
        <LocationListItem
          location={item}
          service={service}
          option={option}
          moreProducts={item.products.length > 1}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  let footer;
  if (locations && locations.length === 0) {
    footer = (
      <NoFoundMessage
        title={service.name}
        description={t("noFoundLocations")}
      />
    );
  }

  const handleDisplayMap = useCallback((index: number) => {
    if (index === 0) {
      sheetRef.current.snapToIndex(index);
    }
  }, []);

  const header = (
    <>
      <View style={{ height: 50, marginBottom: 20 }}>
        <Text style={styles.sheetHeading}>
          {locations && locations?.length} rezultate
        </Text>
      </View>
      {(isLoading || isFetching) && <Spinner />}
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderServices
        details={`${option?.name}, 23 aug - 31 aug, Orice ora`}
        serviceName={service?.name}
      />
      <Map
        locations={locations}
        serviceName={service?.name}
        initialLatitude={latitude}
        initialLongitude={longitude}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.indicatorStyle}
        enableOverDrag={true}
        animateOnMount={false}
        index={1}
      >
        <BottomSheetFlatList
          ListHeaderComponent={header}
          showsVerticalScrollIndicator={false}
          data={locations}
          keyExtractor={keyExtractor}
          renderItem={renderLocation}
          ListFooterComponent={footer}
        />
      </BottomSheet>
      <View
        style={{
          position: "absolute",
          bottom: 75,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Pressable
          onPress={() => handleDisplayMap(0)}
          style={{
            backgroundColor: "#333333",
            paddingVertical: 11.5,
            paddingHorizontal: 25,
            borderRadius: 50,
            shadowColor: "#171717",
            shadowOffset: { width: -3, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <Stack direction="row">
            <Icon name="map-pin" type="feather" color="white" size={20} />
            <Text
              style={{
                color: "white",
                marginLeft: 5,
                fontWeight: "600",
                fontSize: 15.5,
              }}
            >
              Hartă
            </Text>
          </Stack>
        </Pressable>
      </View>
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
    marginTop: 10,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
