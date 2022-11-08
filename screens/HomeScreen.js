import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import FakeSearchBar from "../components/customized/FakeSearchBar/FakeSearchBar";
import theme from "../assets/styles/theme";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { ServicesList, CardRecommended } from "../components/customized";
import { useGet } from "../hooks";

const { black } = theme.lightColors;

export const HomeScreen = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const navigation = useNavigation();

  useScrollToTop(ref);

  const { data: locations } = useGet({
    model: "recommended",
    uri: `/locations/get-recommended?latlng=26.100195,44.428286`,
  });

  const { data: services } = useGet({ model: "services", uri: "/services" });

  const renderRecommended = useCallback(
    ({ item }) => <CardRecommended location={item} />,
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

  const goToServicesAnytime = () =>
    navigation.navigate("SearchServices", {
      period: { code: 0 },
    });
  const goToServicesNow = () =>
    navigation.navigate("SearchServices", {
      period: { code: 1 },
    });

  const header = (
    <>
      <ServicesList services={services} />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
        <Divider width={2} color="#f1f1f1" style={styles.divider} />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <FakeSearchBar
          onGoAnytime={goToServicesAnytime}
          onGoNow={goToServicesNow}
        />
        <FlatList
          ref={ref}
          ListHeaderComponent={header}
          data={locations}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={renderRecommended}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  sheetHeading: {
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
