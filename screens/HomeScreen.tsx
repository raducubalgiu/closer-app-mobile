import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from "react-native";
import {
  MasonryFlashList,
  MasonryListRenderItemInfo,
} from "@shopify/flash-list";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import FakeSearchBar from "../components/customized/FakeSearchBar/FakeSearchBar";
import theme from "../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { ServicesList, CardRecommended } from "../components/customized";
import { useGet, useRefreshByUser } from "../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { RecommendedLocation } from "../models/recommendedLocation";

const { black } = theme.lightColors || {};

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: locations } = useGet({
    model: "recommended",
    uri: `/locations/get-recommended?latlng=26.100195,44.428286`,
  });

  const { data: services, refetch } = useGet({
    model: "services",
    uri: "/services",
  });

  const renderRecommended = useCallback(
    ({ item, index }: MasonryListRenderItemInfo<RecommendedLocation>) => (
      <CardRecommended location={item} index={index} />
    ),
    []
  );
  const keyExtractor = useCallback((item: any) => item._id, []);

  const goToServicesAnytime = () =>
    navigation.navigate("SearchServices", {
      period: { code: 0 },
    });
  const goToServicesNow = () =>
    navigation.navigate("SearchServices", {
      period: { code: 1 },
    });

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
      <FakeSearchBar
        onGoAnytime={goToServicesAnytime}
        onGoNow={goToServicesNow}
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
