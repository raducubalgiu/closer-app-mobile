import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CardHashtagOverview, TopTabContainer } from "../components/customized";
import { Header } from "../components/core";
import { useGet } from "../src/hooks";
import {
  HashtagPostsPopularTab,
  HashtagPostsRecentTab,
  HashtagPostsBookableTab,
} from "../components/customized";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = NativeStackScreenProps<RootStackParams, "Hashtag">;
const { height } = Dimensions.get("window");

export const HashtagScreen = ({ route }: IProps) => {
  const { name } = route.params;
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();
  const { data } = useGet({ model: "hashtag", uri: `/hashtags/${name}` });

  const HEADER_HEIGHT = 145;
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

  const HashtagPostsBookable = useCallback(
    () => (
      <HashtagPostsBookableTab
        name={name}
        onScroll={onScroll}
        headerHeight={HEADER_HEIGHT}
      />
    ),
    [name]
  );
  const HashtagPostsPopular = useCallback(
    () => (
      <HashtagPostsPopularTab
        name={name}
        onScroll={onScroll}
        headerHeight={HEADER_HEIGHT}
      />
    ),
    [name]
  );
  const HashtagPostsRecent = useCallback(
    () => (
      <HashtagPostsRecentTab
        name={name}
        onScroll={onScroll}
        headerHeight={HEADER_HEIGHT}
      />
    ),
    [name]
  );

  return (
    <View style={styles.screen}>
      <Header
        title={`#${name}`}
        sx={{ paddingTop: HEADER_PADDING_TOP, paddingBottom: 0 }}
      />
      <Animated.View
        style={[{ flex: 1 }, { transform: [{ translateY: headerTranslate }] }]}
      >
        <CardHashtagOverview
          bookmarkId={data?.id}
          postsCount={data?.postsCount}
          bookmarksCount={data?.bookmarksCount}
        />
        <View style={{ height }}>
          <TopTabContainer initialRouteName="HashtagPostsPopular">
            <Tab.Screen
              name="HashtagPostsPopular"
              component={HashtagPostsPopular}
              options={{ tabBarLabel: t("populars") }}
            />
            <Tab.Screen
              name="HashtagPostsBookable"
              component={HashtagPostsBookable}
              options={{ tabBarLabel: t("bookable") }}
            />
            <Tab.Screen
              name="HashtagPostsRecent"
              component={HashtagPostsRecent}
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
