import { useCallback } from "react";
import { TopTabContainer } from "./TopTabContainer";
import { ServiceTab } from "../ServiceTab/ServiceTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Service } from "../../../../models/service";

type IProps = {
  userId: string;
  initialRoute: any;
  option: string | null;
  service: Service | null;
  services: Service[];
  onScroll: () => void;
};

export const TopTabServices = ({
  userId,
  initialRoute,
  option,
  service,
  services,
  onScroll,
}: IProps) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <TopTabContainer initialRouteName={initialRoute} tabBarScrollEnabled>
      {services?.map((service: Service, i: number) => {
        const Service = useCallback(
          () => (
            <ServiceTab
              key={i}
              userId={userId}
              service={service}
              option={option}
              initialRoute={initialRoute}
              onScroll={onScroll}
            />
          ),
          [userId, service, option, initialRoute]
        );

        return (
          <Tab.Screen
            key={i}
            name={service.name.toLowerCase()}
            component={Service}
            options={{
              tabBarLabel: `${service?.name}`,
              tabBarItemStyle: {
                height: 37.5,
              },
              tabBarLabelStyle: {
                textTransform: "uppercase",
                fontWeight: "600",
                height: 15,
                marginBottom: 15,
              },
            }}
          />
        );
      })}
    </TopTabContainer>
  );
};
