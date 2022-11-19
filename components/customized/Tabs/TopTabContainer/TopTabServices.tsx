import { useCallback } from "react";
import { TopTabContainer } from "./TopTabContainer";
import { ServiceTab } from "../ServiceTab/ServiceTab";
import { useGet, useHttpGet } from "../../../../hooks";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export const TopTabServices = ({ userId, initialRoute, option, service }) => {
  const Tab = createMaterialTopTabNavigator();

  const { data: services } = useGet({ model: "services", uri: "/services" });

  return (
    <TopTabContainer initialRouteName={initialRoute}>
      {services?.map((service) => {
        const Service = useCallback(
          () => (
            <ServiceTab
              userId={userId}
              service={service}
              option={option}
              initialRoute={initialRoute}
            />
          ),
          [userId, service, option, initialRoute]
        );

        return (
          <Tab.Screen
            key={service._id}
            name={service.name.toLowerCase()}
            component={Service}
            options={{
              tabBarLabel: `${service?.name}`,
            }}
          />
        );
      })}
    </TopTabContainer>
  );
};
