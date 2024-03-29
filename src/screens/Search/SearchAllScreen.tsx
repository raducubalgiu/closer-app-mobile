import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SearchHashtagsTab,
  SearchUsersTab,
  SearchPopularTab,
  SearchLastMinuteTab,
  TopTabContainer,
  SearchBookablesTab,
  SearchServicesTab,
  HeaderSearchAll,
  SearchVideoTab,
} from "../../components/customized";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import theme from "../../../assets/styles/theme";

const { secondary, error } = theme.lightColors || {};

type IProps = NativeStackScreenProps<RootStackParams, "SearchAll">;

export const SearchAllScreen = ({ route }: IProps) => {
  const { search } = route.params;
  const { t } = useTranslation("common");
  const Tab = createMaterialTopTabNavigator();

  const Populars = useCallback(
    () => <SearchPopularTab search={search} />,
    [search]
  );
  const Video = useCallback(() => <SearchVideoTab search={search} />, [search]);
  const SearchBookable = useCallback(
    () => <SearchBookablesTab search={search} />,
    [search]
  );
  const LastMinute = useCallback(
    () => <SearchLastMinuteTab search={search} />,
    [search]
  );
  const SearchUsers = useCallback(
    () => <SearchUsersTab search={search} />,
    [search]
  );
  const SearchServices = useCallback(
    () => <SearchServicesTab search={search} />,
    [search]
  );
  const SearchHashtags = useCallback(
    () => <SearchHashtagsTab search={search} />,
    [search]
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <HeaderSearchAll search={search} />
      </SafeAreaView>
      <TopTabContainer
        initialRouteName="SearchPopular"
        tabBarScrollEnabled={true}
        options={{ tabBarItemStyle: { width: 110 } }}
      >
        <Tab.Screen
          name="SearchPopular"
          component={Populars}
          options={{ tabBarLabel: t("populars") }}
        />
        <Tab.Screen
          name="SearchVideo"
          component={Video}
          options={{ tabBarLabel: t("video") }}
        />
        <Tab.Screen
          name="SearchBookable"
          component={SearchBookable}
          options={{
            tabBarLabel: t("bookables"),
            tabBarBadge: () => (
              <View
                style={{
                  ...styles.badge,
                  backgroundColor: secondary,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SearchLastMinute"
          component={LastMinute}
          options={{
            tabBarLabel: t("lastMinute"),
            tabBarBadge: () => (
              <View
                style={{
                  ...styles.badge,
                  backgroundColor: error,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SearchUsers"
          component={SearchUsers}
          options={{ tabBarLabel: t("users") }}
        />
        <Tab.Screen
          name="SearchServices"
          component={SearchServices}
          options={{ tabBarLabel: t("services") }}
        />
        <Tab.Screen
          name="SearchHashtags"
          component={SearchHashtags}
          options={{ tabBarLabel: t("hashtags") }}
        />
      </TopTabContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  badge: {
    width: 6.5,
    height: 6.5,
    borderRadius: 50,
    top: 5,
    right: 5,
  },
});
