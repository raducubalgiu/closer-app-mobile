import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Stack, IconBackButton, Button } from "../components/core";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SearchHashtagsTab,
  SearchUsersTab,
  SearchPopularTab,
  TopTabContainer,
  SearchBookablesTab,
  SearchServicesTab,
} from "../components/customized";
import { useAuth, useHttpPost } from "../hooks";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export const SearchAllScreen = ({ route }) => {
  const { user } = useAuth();
  const { search } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { makePost } = useHttpPost(`/searches`);

  useEffect(() => {
    if (search) {
      makePost({ word: search, user: user?._id });
    }
  }, [search]);

  const Tab = createMaterialTopTabNavigator();

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
        <Stack
          direction="row"
          justify="start"
          sx={{ paddingHorizontal: 15, height: 60 }}
        >
          <IconBackButton sx={{ marginRight: 10 }} />
          <Button
            sx={{
              flex: 1,
              backgroundColor: "#f1f1f1",
              padding: 8,
              borderRadius: 2.5,
            }}
            onPress={() => navigation.goBack()}
          >
            <Stack direction="row">
              <Stack direction="row">
                <Icon
                  name="search"
                  type="ionicon"
                  color={theme.lightColors.black}
                  size={20}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: theme.lightColors.grey0,
                    marginLeft: 7.5,
                  }}
                >
                  {search}
                </Text>
              </Stack>
              <Icon
                name="closecircle"
                type="antdesign"
                size={16}
                color="#bbb"
              />
            </Stack>
          </Button>
        </Stack>
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
  container: {
    flex: 1,
  },
  labelStyle: {
    textTransform: "capitalize",
    fontSize: 14,
  },
  indicatorStyle: {
    backgroundColor: theme.lightColors.black,
  },
});
