import { StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { Header } from "../components/core";
import { CardServiceOverview, TopTabContainer } from "../components/customized";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ServicePostsPopularTab,
  ServicePostsLastMinuteTab,
  ServicePostsRecentTab,
} from "../components/customized";
import { useTranslation } from "react-i18next";

export const ServiceScreen = ({ route }) => {
  const { service } = route.params;
  const { _id, name, postsCount } = service;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const ServicePostsPopular = useCallback(
    () => <ServicePostsPopularTab serviceId={_id} />,
    [_id]
  );
  const ServicePostsLastMinute = useCallback(
    () => <ServicePostsLastMinuteTab serviceId={_id} />,
    [_id]
  );
  const ServicePostsRecent = useCallback(
    () => <ServicePostsRecentTab serviceId={_id} />,
    [_id]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <CardServiceOverview
        serviceId={_id}
        postsCount={postsCount}
        name={name}
      />
      <TopTabContainer initialRouteName="ServicePostsPopular">
        <Tab.Screen
          name="ServicePostsPopular"
          component={ServicePostsPopular}
          options={{ tabBarLabel: t("popular") }}
        />
        <Tab.Screen
          name="ServicePostsLastMinute"
          component={ServicePostsLastMinute}
          options={{ tabBarLabel: t("lastMinute") }}
        />
        <Tab.Screen
          name="ServicePostsRecent"
          component={ServicePostsRecent}
          options={{ tabBarLabel: t("recent") }}
        />
      </TopTabContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
});
