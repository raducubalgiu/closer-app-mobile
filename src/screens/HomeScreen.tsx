import { SafeAreaView, StyleSheet, Text, RefreshControl } from "react-native";
import {
  MasonryFlashList,
  MasonryListRenderItemInfo,
} from "@shopify/flash-list";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import theme from "../../assets/styles/theme";
import {
  ServicesList,
  CardRecommended,
  FakeSearchBarServices,
} from "../components/customized";
import { useGet, useRefreshByUser, useRefreshOnFocus } from "../hooks";
import { RecommendedLocation, Service } from "../ts";

const { black } = theme.lightColors || {};

export const HomeScreen = () => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: locations, refetch } = useGet<RecommendedLocation[]>({
    model: "recommended",
    uri: `/locations/recommended?latlng=26.100195,44.428286`,
  });

  const { data: services } = useGet<Service[]>({
    model: "services",
    uri: "/services",
  });

  const renderRecommended = useCallback(
    ({ item, index }: MasonryListRenderItemInfo<RecommendedLocation>) => (
      <CardRecommended location={item} index={index} />
    ),
    []
  );
  const keyExtractor = useCallback((item: RecommendedLocation) => item._id, []);

  const goToServicesAnytime = () =>
    navigation.navigate("SearchServices", {
      screen: "Calendar",
      defaultPeriod: {
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        startMinutes: null,
        endMinutes: null,
        key: "",
        monthIndex: 0,
      },
    });

  const goToServicesToday = () =>
    navigation.navigate("SearchServices", {
      screen: "FixedPeriods",
      defaultPeriod: {
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        startMinutes: null,
        endMinutes: null,
        key: "today",
        monthIndex: 0,
      },
    });

  useRefreshOnFocus(refetch);

  const { refetchByUser, refreshing } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const header = (
    <>
      <ServicesList services={services} />
      <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FakeSearchBarServices
        onGoAnytime={goToServicesAnytime}
        onGoToday={goToServicesToday}
      />
      <MasonryFlashList
        refreshControl={refreshControl}
        ListHeaderComponent={header}
        data={locations}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        renderItem={renderRecommended}
        numColumns={2}
        estimatedItemSize={125}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
  sheetHeading: {
    paddingLeft: 10,
    paddingVertical: 15,
    color: black,
    fontSize: 15,
    fontWeight: "600",
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  divider: { paddingBottom: 5, marginBottom: 5 },
  bottomSheet: {
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
});
