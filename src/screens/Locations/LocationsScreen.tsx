import {
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";
import { useState, useCallback, useRef, useMemo } from "react";
import { Divider } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { isEmpty } from "lodash";
import { RootStackParams } from "../../navigation/rootStackParams";
import { SheetModal, Spinner } from "../../components/core";
import {
  HeaderServices,
  Map,
  NoFoundMessage,
  LocationListItem,
  HeaderSheet,
} from "../../components/customized";
import { useGet } from "../../hooks";
import theme from "../../../assets/styles/theme";
import { Location } from "../../ts";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Locations">;

const SHEET_HEADER = 75;
const HEADER_HEIGHT = 160;

export const LocationsScreen = ({ route }: IProps) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("common");
  const {
    service,
    option,
    period,
    longitude,
    latitude,
    sort,
    distance,
    price,
  } = route.params;
  const fullHeight = height - HEADER_HEIGHT + SHEET_HEADER;
  const mapHeight = height - HEADER_HEIGHT - insets.top - 50;

  const snapPoints = useMemo(() => [100, height / 2, fullHeight], []);
  const businessReviewsSnapPoints = useMemo(() => [10, height / 1.5], []);
  const locationsRef = useRef<BottomSheet>(null);
  const businessReviewsRef = useRef<BottomSheetModal>(null);

  const [sheetIndex, setSheetIndex] = useState(1);

  const minDistance = distance?.min ? distance?.min * 1000 : 0;
  const maxDistance = distance?.max ? distance?.max * 1000 : 0;

  const startMinutes = period?.startMinutes ? period?.startMinutes : 0;
  const endMinutes = period?.endMinutes ? period?.endMinutes : 1440;

  const {
    data: locations,
    isFetching,
    isLoading,
    isError,
  } = useGet<Location[]>({
    model: "locations",
    uri: `/locations?page=1&limit=25&start=${period?.startDate}&end=${period?.endDate}&startMinutes=${startMinutes}&endMinutes=${endMinutes}&latlng=${longitude},${latitude}&serviceId=${service?.id}&option=${option?._id}&minprice=${price?.min}&maxprice=${price?.max}&mindistance=${minDistance}&maxdistance=${maxDistance}&sort=${sort?.query}`,
  });

  const loading = isFetching || isLoading;
  const displayError = !loading && isError && !locations;

  const renderLocation = useCallback(
    ({ item }: ListRenderItemInfo<Location>) => {
      return (
        <LocationListItem
          location={item}
          service={service}
          option={option}
          period={period}
          onDisplayOwnerReviews={() => businessReviewsRef.current?.present()}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback(
    (_: Location, index: number) => index.toString(),
    []
  );

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

  const handleOnChange = useCallback(
    (index: number) => setSheetIndex(index),
    []
  );

  const itemSeparator = useCallback(
    () => <Divider style={{ marginVertical: 20 }} color="#ddd" />,
    []
  );

  return (
    <View style={styles.screen}>
      <HeaderServices
        headerHeight={HEADER_HEIGHT}
        service={service}
        option={option}
        period={period}
        sort={sort}
        distance={distance}
        price={price}
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
        ref={locationsRef}
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
          ItemSeparatorComponent={itemSeparator}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        />
      </BottomSheet>
      <SheetModal
        ref={businessReviewsRef}
        snapPoints={businessReviewsSnapPoints}
        showIndicator={false}
        enableContentPanningGesture={false}
        duration={500}
      >
        <HeaderSheet
          title={t("reviews")}
          onClose={() => businessReviewsRef.current?.close()}
        />
      </SheetModal>
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
