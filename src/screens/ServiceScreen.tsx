import { StyleSheet, Animated, View, Dimensions } from "react-native";
import { useCallback, useRef } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = NativeStackScreenProps<RootStackParams, "Service">;
const { height } = Dimensions.get("window");

export const ServiceScreen = ({ route }: IProps) => {
  const { service } = route.params;
  const { id, name, postsCount } = service;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation("common");
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 144;
  const HEADER_PADDING_TOP = insets.top + 10;

  const value = useRef(new Animated.Value(0)).current;
  const headerTranslate = value.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: value } } }],
    {
      useNativeDriver: false,
    }
  );

  const ServicePostsPopular = useCallback(
    () => (
      <ServicePostsPopularTab
        serviceId={id}
        onScroll={onScroll}
        headerHeight={HEADER_HEIGHT}
      />
    ),
    [id]
  );
  const ServicePostsLastMinute = useCallback(
    () => (
      <ServicePostsLastMinuteTab
        serviceId={id}
        onScroll={onScroll}
        headerHeight={HEADER_HEIGHT}
      />
    ),
    [id]
  );
  const ServicePostsRecent = useCallback(
    () => (
      <ServicePostsRecentTab
        serviceId={id}
        onScroll={onScroll}
        headerHeight={HEADER_HEIGHT}
      />
    ),
    [id]
  );

  return (
    <View style={styles.screen}>
      <Header
        title=""
        sx={{ paddingTop: HEADER_PADDING_TOP, paddingBottom: 0 }}
      />
      <Animated.View
        style={[{ flex: 1 }, { transform: [{ translateY: headerTranslate }] }]}
      >
        <CardServiceOverview
          serviceId={id}
          postsCount={postsCount}
          name={name}
        />
        <View style={{ height }}>
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
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
});
