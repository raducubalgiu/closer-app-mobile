import { StyleSheet, Dimensions } from "react-native";
import { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";
import { ServiceTab } from "../ServiceTab/ServiceTab";
import { useHttpGet } from "../../../../hooks";

const { black } = theme.lightColors;
const { width } = Dimensions.get("window");

export const TopTabProducts = ({ userId, services, initialRoute, option }) => {
  const Tab = createMaterialTopTabNavigator();

  const screenOptions = {
    tabBarActiveTintColor: black,
    tabBarLabelStyle: styles.tabLabel,
    tabBarIndicatorStyle: styles.tabIndicator,
    tabBarScrollEnabled: true,
    tabBarItemStyle: { width: 140 },
    tabBarContentContainerStyle: { height: 35 },
  };

  const { data: products } = useHttpGet(`/users/${userId}/products/all`);

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
              tabBarLabel: `${service?.name} ${
                products.filter((prod) => prod.service === service?._id).length
              }`,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    marginTop: -10,
    textTransform: "capitalize",
    fontWeight: "600",
  },
  tabIndicator: {
    backgroundColor: "transparent",
  },
});
