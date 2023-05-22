import { useWindowDimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

type IProps = { initialRouteName: string; children: any };

export const TopTabPeriod = ({ initialRouteName, children }: IProps) => {
  const { width } = useWindowDimensions();

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarContentContainerStyle: {
          height: 42,
        },
        tabBarStyle: {
          borderRadius: 25,
          backgroundColor: "#eee",
          width: 280,
          marginLeft: width / 2 - 140,
          justifyContent: "center",
        },
        tabBarItemStyle: {
          width: 140,
        },
        tabBarLabelStyle: {
          color: "black",
          textTransform: "none",
          fontWeight: "600",
          marginBottom: 5,
          height: 32,
          marginTop: 16,
        },
        tabBarIndicatorStyle: {
          height: 32,
          width: 130,
          marginHorizontal: 5,
          marginBottom: 5,
          borderRadius: 25,
          backgroundColor: "white",
        },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      {children}
    </Tab.Navigator>
  );
};
