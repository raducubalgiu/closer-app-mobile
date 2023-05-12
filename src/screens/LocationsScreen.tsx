import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  Dimensions,
  Pressable,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderServices, Map, NoFoundMessage } from "../components/customized";
import LocationListItem from "../components/customized/ListItems/LocationListItem";
import { useGet } from "../hooks";
import theme from "../../assets/styles/theme";
import { RootStackParams } from "../navigation/rootStackParams";
import { Location } from "../ts";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Spinner, Stack } from "../components/core";
import * as Animatable from "react-native-animatable";

const { black } = theme.lightColors || {};
const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "Locations">;

export const LocationsScreen = ({ route }: IProps) => {
  const { service, option, period, longitude, latitude } = route.params;
  const sheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const fullHeight = height - insets.top - insets.bottom + 40;
  const snapPoints = useMemo(() => [90, fullHeight], []);
  const [defaultAnim, setDefAnim] = useState("");
  const [showMapButton, setShowMapButton] = useState(true);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);
  const { t } = useTranslation("common");

  const {
    data: locations,
    isLoading,
    isFetching,
  } = useGet<Location[]>({
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

  const handleOnChange = (index: number) => {
    if (index === 1) {
      setDefAnim("fadeIn");
      setShowMapButton(true);
    } else {
      setDefAnim("fadeOut");
      setShowMapButton(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderServices
        details={`${option?.name}, 23 aug - 31 aug, Orice ora`}
        service={service}
        period={period}
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
        animateOnMount={false}
        index={1}
        containerStyle={{ flex: 1 }}
        onChange={handleOnChange}
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
      {showMapButton && (
        <Animatable.View
          animation={defaultAnim}
          style={{
            position: "absolute",
            bottom: insets.bottom + 70,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Pressable
            onPress={() => {
              console.log("Pressed!!");
              sheetRef?.current?.snapToIndex(0);
            }}
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
        </Animatable.View>
      )}
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
