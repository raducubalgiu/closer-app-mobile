import { StyleSheet, Dimensions } from "react-native";
import { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";
import { ServiceTab } from "../ServiceTab/ServiceTab";

const { black } = theme.lightColors;
const { width } = Dimensions.get("window");

export const TopTabProducts = ({ userId, services, initialRoute, option }) => {
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
      {services?.map((service) => {
        const Service = useCallback(
          () => (
            <ServiceTab userId={userId} service={service} option={option} />
          ),
          [userId, service]
        );

        return (
          <Tab.Screen
            key={service._id}
            name={service.name.toLowerCase()}
            component={Service}
            options={{
              tabBarLabel: service.name,
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
