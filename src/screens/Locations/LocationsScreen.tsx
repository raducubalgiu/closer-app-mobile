import {
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";
import { Divider } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useState, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  HeaderServices,
  Map,
  NoFoundMessage,
} from "../../components/customized";
import LocationListItem from "../../components/customized/ListItems/LocationListItem";
import { useGet } from "../../hooks";
import theme from "../../../assets/styles/theme";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Location } from "../../ts";
import { Spinner } from "../../components/core";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Locations">;

const SHEET_HEADER = 75;
const HEADER_HEIGHT = 160;

export const LocationsScreen = ({ route }: IProps) => {
  const { service, option, period, longitude, latitude, sort } = route.params;
  const sheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const fullHeight = height - HEADER_HEIGHT + SHEET_HEADER;
  const mapHeight = height - HEADER_HEIGHT - insets.top - 50;
  const snapPoints = useMemo(() => [100, height / 2, fullHeight], []);
  const [sheetIndex, setSheetIndex] = useState(1);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);
  const { t } = useTranslation("common");

  const {
    data: locations,
    isFetching,
    isLoading,
  } = useGet<Location[]>({
    model: "locations",
    uri: `/locations?page=1&limit=25&latlng=${longitude},${latitude}&serviceId=${service?.id}&option=${option?._id}&minprice=${minPrice}&maxprice=${maxPrice}&mindistance=${minDistance}&maxdistance=${maxDistance}&minrating=0&maxrating=5&sort=${sort.query}`,
  });

  const loading = isFetching || isLoading;

  const renderLocation = useCallback(
    ({ item }: ListRenderItemInfo<Location>) => {
      return (
        <LocationListItem location={item} service={service} option={option} />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  let footer;
  if (locations && locations.length === 0) {
    footer = (
      <NoFoundMessage
        title={service?.name}
        description={t("noFoundLocations")}
      />
    );
  }

  const header = (
    <>
      <View
        style={{
          height: SHEET_HEADER,
          marginTop: 7.5,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#ddd",
            width: 45,
            height: 4,
            borderRadius: 2.5,
          }}
        />
        <Text style={styles.sheetHeading}>
          {locations && locations?.length} {t("results")}
        </Text>
      </View>
      <Divider color="#eee" style={{ marginBottom: 15 }} />
    </>
  );

  const handleOnChange = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  return (
    <View style={styles.screen}>
      <HeaderServices
        headerHeight={HEADER_HEIGHT}
        service={service}
        option={option}
        period={period}
        sort={sort}
        onShowMap={() => sheetRef.current?.snapToIndex(0)}
      />
      <Map
        locations={locations}
        serviceName={service?.name}
        initialLatitude={latitude}
        initialLongitude={longitude}
        mapHeight={mapHeight}
        sheetIndex={sheetIndex}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.indicatorStyle}
        handleStyle={{ padding: 0 }}
        animateOnMount={false}
        index={1}
        onChange={handleOnChange}
      >
        {!loading && (
          <BottomSheetFlatList
            ListHeaderComponent={header}
            data={locations}
            keyExtractor={keyExtractor}
            renderItem={renderLocation}
            ListFooterComponent={footer}
            ItemSeparatorComponent={() => (
              <Divider style={{ marginVertical: 15 }} color="#ddd" />
            )}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
          />
        )}
        {loading && (
          <BottomSheetView style={{ flex: 1 }}>
            <Spinner />
          </BottomSheetView>
        )}
      </BottomSheet>
    </View>
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
    marginTop: 15,
  },
  indicatorStyle: {
    display: "none",
  },
});
