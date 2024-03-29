import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import {
  FollowersTab,
  FollowingsTab,
  ReviewsTab,
  TopTabContainer,
} from "../../../components/customized/index";
import { Header } from "../../../components/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "ProfileStats">;

export const ProfileStatsScreen = ({ route }: IProps) => {
  const { initialRoute, username, userId, role, settings } = route.params;
  const { ratingsQuantity, followersCount, followingsCount } = route.params;
  const { t } = useTranslation("common");
  const Tab = createMaterialTopTabNavigator();

  const Ratings = useCallback(() => <ReviewsTab userId={userId} />, [userId]);
  const Followers = useCallback(
    () => <FollowersTab userId={userId} />,
    [userId]
  );
  const Followings = useCallback(
    () => <FollowingsTab userId={userId} settings={settings} />,
    [userId, settings]
  );

  const isBusiness = role === MAIN_ROLE || role === SECOND_ROLE;

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={username} />
      </SafeAreaView>
      <TopTabContainer initialRouteName={initialRoute}>
        {isBusiness && (
          <Tab.Screen
            name="Ratings"
            component={Ratings}
            options={{ tabBarLabel: `${ratingsQuantity} ${t("reviews")}` }}
          />
        )}
        <Tab.Screen
          name="Followers"
          component={Followers}
          options={{ tabBarLabel: `${followersCount} ${t("followers")}` }}
        />
        <Tab.Screen
          name="Following"
          component={Followings}
          options={{ tabBarLabel: `${followingsCount} ${t("following")}` }}
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
});
