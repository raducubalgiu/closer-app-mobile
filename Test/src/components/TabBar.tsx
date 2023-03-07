import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { FC, useEffect, memo } from "react";
import { View, TouchableOpacity } from "react-native";

type Props = MaterialTopTabBarProps & {
  onIndexChange?: (index: number) => void;
};

const TabBar: FC<Props> = ({ onIndexChange, ...props }) => {
  const { state, descriptors } = props;
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
          default:
            name = "grid-large";
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}
          >
            <Icon
              name={name}
              type="material-community"
              color={isFocused ? "black" : "#ccc"}
              size={22.5}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(TabBar);
