import {
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";
import { Divider } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useState, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { isEmpty } from "lodash";
import { Spinner } from "../../components/core";
import {
  HeaderServices,
  Map,
  NoFoundMessage,
  LocationListItem,
} from "../../components/customized";
import { useGet } from "../../hooks";
import theme from "../../../assets/styles/theme";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Location } from "../../ts";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Locations">;

const SHEET_HEADER = 75;
const HEADER_HEIGHT = 160;

export const LocationsScreen = ({ route }: IProps) => {
  const { service, option, period, longitude, latitude, sort } = route.params;
  const { min, max } = route.params.distance || {};
  const sheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const fullHeight = height - HEADER_HEIGHT + SHEET_HEADER;
  const mapHeight = height - HEADER_HEIGHT - insets.top - 50;
  const snapPoints = useMemo(() => [100, height / 2, fullHeight], []);
  const [sheetIndex, setSheetIndex] = useState(1);
  const { t } = useTranslation("common");

  const minDistance = min ? min * 1000 : 0;
  const maxDistance = max ? max * 1000 : 0;

  const {
    data: locations,
    isFetching,
    isLoading,
    isError,
  } = useGet<Location[]>({
    model: "locations",
    uri: `/locations?page=1&limit=25&latlng=${longitude},${latitude}&serviceId=${service?.id}&option=${option?._id}&minprice=0&maxprice=5000&mindistance=${minDistance}&maxdistance=${maxDistance}&sort=${sort?.query}`,
  });

  const loading = isFetching || isLoading;
  const displayError = !loading && isError && !locations;

  const renderLocation = useCallback(
    ({ item }: ListRenderItemInfo<Location>) => {
      return (
        <LocationListItem location={item} service={service} option={option} />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  let footer = (
    <>
      {!loading && isEmpty(locations) && (
        <NoFoundMessage
          title={service?.name}
          description={t("noFoundLocations")}
        />
      )}
      {loading && <Spinner />}
      {displayError && (
        <NoFoundMessage
          title={t("error")}
          description={t("errorAppearedTryLater")}
          iconProps={{ name: "error-outline", type: "material" }}
        />
      )}
    </>
  );

  const header = (
    <>
      <View style={styles.sheetHeader}>
        <View style={styles.indicator} />
        <Text style={styles.sheetHeading}>
          {!isEmpty(locations) ? locations?.length : 0} {t("results")}
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
        distance={route.params.distance}
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
        <BottomSheetFlatList
          ListHeaderComponent={header}
          data={locations}
          keyExtractor={keyExtractor}
          renderItem={renderLocation}
          ListFooterComponent={footer}
          ItemSeparatorComponent={() => (
            <Divider style={{ marginVertical: 20 }} color="#ddd" />
          )}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  sheetHeader: {
    height: SHEET_HEADER,
    marginTop: 7.5,
    alignItems: "center",
  },
  indicator: {
    backgroundColor: "#ddd",
    width: 45,
    height: 4,
    borderRadius: 2.5,
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
