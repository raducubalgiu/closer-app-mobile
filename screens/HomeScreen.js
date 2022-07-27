import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import FakeSearchBar from "../components/customized/FakeSearchBar/FakeSearchBar";
import theme from "../assets/styles/theme";
import { useScrollToTop } from "@react-navigation/native";
import { ServicesList, CardRecommended } from "../components/customized";
import { useHttpGet } from "../hooks";

const HomeScreen = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  useScrollToTop(ref);

  const { data: locations } = useHttpGet(
    `/users/get-recommended?latlng=26.100195,44.428286`
  );

  const renderRecommended = ({ item }) => <CardRecommended location={item} />;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <FakeSearchBar />
        <FlatList
          ref={ref}
          ListHeaderComponent={
            <>
              <ServicesList />
              <View>
                <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
                <Divider width={2} color="#f1f1f1" style={styles.divider} />
              </View>
            </>
          }
          data={locations}
          keyExtractor={(item) => item._id}
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
    paddingHorizontal: 15,
    flex: 1,
  },
  sheetHeading: {
    paddingVertical: 15,
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
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

export default HomeScreen;
