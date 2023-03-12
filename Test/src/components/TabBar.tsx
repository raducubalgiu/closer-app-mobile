import {
  MaterialTopTabBarProps,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { FC, useEffect, memo } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

type Props = MaterialTopTabBarProps & {
  onIndexChange?: (index: number) => void;
};

const TabBar: FC<Props> = ({ onIndexChange, ...props }) => {
  const { state, descriptors, position } = props;
  const { index, routes } = state;
  const navigation = useNavigation<any>();

  useEffect(() => {
    onIndexChange?.(index);
  }, [onIndexChange, index]);

  return (
    <View style={{ flexDirection: "row" }}>
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(`${route.name}`, { merge: true });
        };

        let name;

        switch (route.name) {
          case "Posts":
            name = "grid-large";
            break;
          case "Videos":
            name = "play-box-multiple-outline";
            break;
          case "About":
            name = "account-circle-outline";
            break;
          default:
            name = "grid-large";
        }

        // const inputRange = state.routes.map((_, i) => i);
        // const opacity = Animated.interpolate(position, {
        //   inputRange,
        //   outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        // });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              height: 43,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <Animated.View
              style={{
                height: 42.5,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 30,
              }}
            >
              <Icon
                name={name}
                type="material-community"
                color={isFocused ? "black" : "#ccc"}
                size={22.5}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(TabBar);
