import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Stack, SearchBarInput, IconBackButton } from "../components/core";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SearchHashtagsTab,
  SearchJobsTab,
  SearchServicesTab,
  SearchUsersTab,
  SearchVideoTab,
  SearchPopularTab,
  TopTabContainer,
} from "../components/customized";

const SearchAllScreen = ({ route }) => {
  const { search } = route.params;
  const { t } = useTranslation();

  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Stack direction="row" justify="start">
          <IconBackButton />
          <SearchBarInput
            value={search}
            cancelButtonTitle={t("search")}
            onPress={() => {}}
          />
        </Stack>
        <TopTabContainer initialRouteName="SearchPopular" tabBarScrollEnabled>
          <Tab.Screen
            name="SearchPopular"
            component={SearchPopularTab}
            options={{ tabBarLabel: "Populare" }}
          />
          <Tab.Screen
            name="SearchUsers"
            component={SearchUsersTab}
            options={{ tabBarLabel: "Utilizatori" }}
          />
          <Tab.Screen
            name="SearchServices"
            component={SearchServicesTab}
            options={{ tabBarLabel: "Servicii" }}
          />
          <Tab.Screen
            name="SearchJobs"
            component={SearchJobsTab}
            options={{ tabBarLabel: "Joburi" }}
          />
          <Tab.Screen
            name="SearchVideo"
            component={SearchVideoTab}
            options={{ tabBarLabel: "Videoclipuri" }}
          />
          <Tab.Screen
            name="SearchHashtags"
            component={SearchHashtagsTab}
            options={{ tabBarLabel: "Hashtaguri" }}
          />
        </TopTabContainer>
      </View>
    </SafeAreaView>
  );
};

export default SearchAllScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  labelStyle: {
    fontFamily: "Exo-SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
  },
  indicatorStyle: {
    backgroundColor: theme.lightColors.black,
  },
});
