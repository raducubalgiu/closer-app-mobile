import { StyleSheet, SafeAreaView } from "react-native";
import { useCallback } from "react";
import { Header } from "../components/core";
import { CardServiceOverview, TopTabContainer } from "../components/customized";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ServicePostsPopularTab,
  ServicePostsLastMinuteTab,
  ServicePostsRecentTab,
} from "../components/customized";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "Service">;

export const ServiceScreen = ({ route }: IProps) => {
  const { service } = route.params;
  const { id, name, postsCount } = service;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const ServicePostsPopular = useCallback(
    () => <ServicePostsPopularTab serviceId={id} />,
    [id]
  );
  const ServicePostsLastMinute = useCallback(
    () => <ServicePostsLastMinuteTab serviceId={id} />,
    [id]
  );
  const ServicePostsRecent = useCallback(
    () => <ServicePostsRecentTab serviceId={id} />,
    [id]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="" />
      <CardServiceOverview serviceId={id} postsCount={postsCount} name={name} />
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
