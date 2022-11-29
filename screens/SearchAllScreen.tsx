import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SearchHashtagsTab,
  SearchUsersTab,
  SearchPopularTab,
  TopTabContainer,
  SearchBookablesTab,
  SearchServicesTab,
  HeaderSearchAll,
} from "../components/customized";
import { useAuth, usePost } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "SearchAll">;

export const SearchAllScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { search } = route.params;
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();

  const { mutate: makePost } = usePost({ uri: "/searches" });

  useEffect(() => {
    if (search) {
      makePost({ word: search, user: user?._id });
    }
  }, [search]);

  const Populars = useCallback(
    () => <SearchPopularTab search={search} />,
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
  const SearchBookable = useCallback(
    () => <SearchBookablesTab search={search} />,
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
        <Tab.Screen
          name="SearchBookable"
          component={SearchBookable}
          options={{ tabBarLabel: t("bookables") }}
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
});
