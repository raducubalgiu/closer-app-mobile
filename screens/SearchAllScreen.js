import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import {
  Stack,
  SearchBarInput,
  IconBackButton,
  Button,
} from "../components/core";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SearchHashtagsTab,
  SearchUsersTab,
  SearchPopularTab,
  TopTabContainer,
} from "../components/customized";
import { useAuth, useHttpPost } from "../hooks";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const SearchAllScreen = ({ route }) => {
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

  const Populars = useCallback(() => <SearchPopularTab search={search} />, []);
  const SearchUsers = useCallback(() => <SearchUsersTab search={search} />, []);
  const SearchHashtags = useCallback(
    () => <SearchHashtagsTab search={search} />,
    []
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
                    fontFamily: "Exo-Regular",
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
