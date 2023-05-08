import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../../../../components/core";
import {
  TopTabContainer,
  LocationDetailsTab,
  LocationPhotosTab,
} from "../../../../components/customized";
import { useAuth, useGet } from "../../../../hooks";
import { showToast } from "../../../../utils";
import { useCallback } from "react";
import { Location } from "../../../../ts";

export const MyLocationScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const Tab = createMaterialTopTabNavigator();

  const { data: location, isInitialLoading } = useGet<Location>({
    model: "myLocation",
    uri: `/users/${user?.id}/locations/${user?.locationId}`,
    options: {
      onError: () => showToast({ message: t("somethingWentWrong") }),
    },
  });

  const LocationDetails = useCallback(
    () => <LocationDetailsTab location={location} loading={isInitialLoading} />,
    [location]
  );

  const LocationPhotos = useCallback(
    () => (
      <LocationPhotosTab
        imageCover={location?.imageCover}
        locationId={location?.id}
      />
    ),
    [location?.imageCover, location?.id]
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title="" />
      </SafeAreaView>
      <TopTabContainer
        initialRouteName="LocationDetails"
        options={{ swipeEnabled: false }}
      >
        <Tab.Screen
          name="LocationDetails"
          component={LocationDetails}
          options={{ tabBarLabel: t("myLocation") }}
        />
        <Tab.Screen
          name="LocationPhotos"
          component={LocationPhotos}
          options={{ tabBarLabel: "Imaginea de fundal" }}
        />
      </TopTabContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  map: {
    marginTop: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    position: "absolute",
    right: 15,
  },
});
