import {
  useState,
  useEffect,
  useRef,
  useMemo,
  RefObject,
  useCallback,
  memo,
} from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Platform,
  useWindowDimensions,
  FlatList,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TabView, TabBarProps, Route, SceneMap } from "react-native-tab-view";
import { User } from "../../../models";
import * as Haptics from "expo-haptics";
import ProfileHeader from "./ProfileHeader";
import ProfileTabBar from "./ProfileTabBar";
import ProfilePostsTab from "./ProfilePostsTab";
import ProfileVideosTab from "./ProfileVideosTab";
import ProfileRefresh from "./ProfileRefresh";

const TabBarHeight = 48;
const HeaderHeight = 300;
const PullToRefreshDist = 80;

type IProps = { user: User; profileActions: any };
type ListRef = { key: string; value: RefObject<FlatList> };

const Profile = ({ user, profileActions }: IProps) => {
  const { width, height } = useWindowDimensions();

  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", name: "grid-large" },
    { key: "videos", name: "play-box-multiple-outline" },
  ]);

  const scrollY = useRef<any>(new Animated.Value(0)).current;
  const headerScrollY = useRef<Animated.Value>(new Animated.Value(0)).current;
  const headerMoveScrollY = useRef<any>(new Animated.Value(0)).current;
  const isListGliding = useRef<boolean>(false);
  const headerScrollStart = useRef<number>(0);
  const _tabIndex = useRef<number>(0);
  const refreshStatusRef = useRef<boolean>(false);

  const postsRef = useRef<FlatList>(null);
  const videosRef = useRef<FlatList>(null);

  const listRefArr = useRef<ListRef[]>([]);
  const listOffset = useRef<any>({});

  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderEnd: (evt, gestureState) => {
        handlePanReleaseOrEnd(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        const curListRef = listRefArr.current.find(
          (ref) => ref.key === routes[_tabIndex.current].key
        );
        const headerScrollOffset = -gestureState.dy + headerScrollStart.current;
        if (curListRef?.value) {
          if (headerScrollOffset > 0) {
            curListRef?.value.current?.scrollToOffset({
              offset: headerScrollOffset,
              animated: false,
            });
          } else {
            if (Platform.OS === "ios") {
              curListRef?.value.current?.scrollToOffset({
                offset: headerScrollOffset / 3,
                animated: false,
              });
            } else if (Platform.OS === "android") {
              if (!refreshStatusRef.current) {
                headerMoveScrollY.setValue(headerScrollOffset / 1.5);
              }
            }
          }
        }
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    })
  ).current;

  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    })
  ).current;

  useEffect(() => {
    scrollY.addListener(({ value }: { value: number }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.current?.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.current?.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.current?.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const startRefreshAction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (Platform.OS === "ios") {
      listRefArr.current.forEach((listRef) => {
        listRef.value.current?.scrollToOffset({
          offset: -50,
          animated: true,
        });
      });
      refresh().finally(() => {
        syncScrollOffset();
        if (scrollY._value < 0) {
          listRefArr.current.forEach((listRef) => {
            listRef.value.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      });
    } else if (Platform.OS === "android") {
      Animated.timing(headerMoveScrollY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
      refresh().finally(() => {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const refresh = async () => {
    console.log("-- start refresh");
    refreshStatusRef.current = true;
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 2000);
    }).then((value) => {
      console.log("-- refresh done!");
      refreshStatusRef.current = false;
    });
  };

  const handlePanReleaseOrEnd = (evt: any, gestureState: any) => {
    syncScrollOffset();
    headerScrollY.setValue(scrollY._value);
    if (Platform.OS === "ios") {
      if (scrollY._value < 0) {
        if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) {
          startRefreshAction();
        } else {
          listRefArr.current.forEach((listRef) => {
            listRef.value.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      } else {
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      }
    } else if (Platform.OS === "android") {
      if (
        headerMoveScrollY._value < 0 &&
        headerMoveScrollY._value / 1.5 < -PullToRefreshDist
      ) {
        startRefreshAction();
      } else {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = (e: any) => {
    syncScrollOffset();

    const offsetY = e.nativeEvent.contentOffset.y;
    if (Platform.OS === "ios") {
      if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) {
        startRefreshAction();
      }
    }
  };

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: HeaderHeight + TabBarHeight,
      minHeight: height - HeaderHeight,
    }),
    [HeaderHeight, TabBarHeight, height]
  );

  const sharedProps = useMemo(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      onScrollEndDrag,
      scrollEventThrottle: 16,
    }),
    []
  );

  const onScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: scrollY } },
      },
    ],
    { useNativeDriver: true }
  );

  const Posts = useCallback(
    ({ route }: any) => {
      if (postsRef) {
        const found = listRefArr.current.find((e) => e.key === route.key);
        if (!found) {
          listRefArr.current.push({
            key: route.key,
            value: postsRef,
          });
        }
      }

      return (
        <ProfilePostsTab
          ref={postsRef}
          userId={user?.id}
          sharedProps={sharedProps}
          panHandlers={listPanResponder.panHandlers}
          onScroll={onScroll}
        />
      );
    },
    [postsRef, routes, listRefArr, sharedProps, listPanResponder, user?.id]
  );

  const Videos = useCallback(
    ({ route }: any) => {
      if (videosRef) {
        const found = listRefArr.current.find((e) => e.key === route.key);
        if (!found) {
          listRefArr.current.push({
            key: route.key,
            value: videosRef,
          });
        }
      }

      return (
        <ProfileVideosTab
          ref={videosRef}
          userId={user?.id}
          sharedProps={sharedProps}
          panHandlers={listPanResponder.panHandlers}
          onScroll={onScroll}
        />
      );
    },
    [videosRef, routes, listRefArr, sharedProps, listPanResponder, user?.id]
  );

  const renderScene = SceneMap({
    posts: Posts,
    videos: Videos,
  });

  const handleChangeIndex = useCallback(
    (index: number) => {
      _tabIndex.current = index;
      setIndex(index);
    },
    [_tabIndex, setIndex]
  );

  const renderTabBar = useCallback(
    (props: TabBarProps<Route>) => {
      return (
        <ProfileTabBar
          tabBarHeight={TabBarHeight}
          headerHeight={HeaderHeight}
          scrollY={scrollY}
          props={props}
          ref={isListGliding}
        />
      );
    },
    [TabBarHeight, HeaderHeight, scrollY, isListGliding]
  );

  return (
    <View style={styles.container}>
      <TabView
        onIndexChange={handleChangeIndex}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ height: 0, width }}
      />
      <ProfileHeader
        user={user}
        panHandlers={headerPanResponder.panHandlers}
        headerHeight={HeaderHeight}
        scrollY={scrollY}
        profileActions={profileActions}
      />
      <ProfileRefresh scrollY={scrollY} headerMoveScrollY={headerMoveScrollY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
  },
});

export default memo(Profile);
