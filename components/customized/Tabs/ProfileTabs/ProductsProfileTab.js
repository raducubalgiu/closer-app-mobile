import { StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";
import { ServiceTab } from "../ServiceTab/ServiceTab";
import { useCallback } from "react";

const { black } = theme.lightColors;
const { width } = Dimensions.get("window");

export const ProductsProfileTab = ({ userId, services, initialRoute }) => {
  const Tab = createMaterialTopTabNavigator();

  const screenOptions = {
    tabBarActiveTintColor: black,
    tabBarLabelStyle: styles.tabLabel,
    tabBarIndicatorStyle: styles.tabIndicator,
    tabBarScrollEnabled: true,
    tabBarItemStyle: { width: 120 },
  };

  return (
    <Tab.Navigator
      initialRouteName={
        initialRoute ? initialRoute : services[0]?.name.toString()
      }
      screenOptions={screenOptions}
      sceneContainerStyle={{ backgroundColor: "white" }}
      initialLayout={{ width, height: 0 }}
    >
      {services?.map((el) => {
        const Service = useCallback(
          () => <ServiceTab userId={userId} service={el} />,
          [userId, el]
        );

        return (
          <Tab.Screen
            key={el._id}
            name={el.name.toLowerCase()}
            component={Service}
            options={{
              tabBarLabel: el.name,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: "Exo-SemiBold",
    fontSize: 14.5,
  },
  tabIndicator: {
    backgroundColor: "transparent",
  },
});
