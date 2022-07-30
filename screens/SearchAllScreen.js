import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { Stack, SearchBarInput, IconBackButton } from "../components/core";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SearchHashtagsTab,
  SearchUsersTab,
  SearchPopularTab,
  TopTabContainer,
} from "../components/customized";

const SearchAllScreen = ({ route }) => {
  const { search } = route.params;
  const { t } = useTranslation();

  const Tab = createMaterialTopTabNavigator();

  const Populars = useCallback(() => <SearchPopularTab search={search} />, []);
  const SearchUsers = useCallback(() => <SearchUsersTab search={search} />, []);
  const SearchHashtags = useCallback(
    () => <SearchHashtagsTab search={search} />,
    []
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Stack direction="row" justify="start" sx={{ paddingHorizontal: 15 }}>
          <IconBackButton sx={{ marginRight: 10 }} />
          <SearchBarInput
            value={search}
            cancelButtonTitle={t("search")}
            height={60}
            showCancel={false}
          />
        </Stack>
      </SafeAreaView>
      <TopTabContainer initialRouteName="SearchPopular">
        <Tab.Screen
          name="SearchPopular"
          component={Populars}
          options={{ tabBarLabel: "Populare" }}
        />
        <Tab.Screen
          name="SearchUsers"
          component={SearchUsers}
          options={{ tabBarLabel: "Utilizatori" }}
        />
        <Tab.Screen
          name="SearchHashtags"
          component={SearchHashtags}
          options={{ tabBarLabel: "Hashtaguri" }}
        />
      </TopTabContainer>
    </View>
  );
};

export default SearchAllScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
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
