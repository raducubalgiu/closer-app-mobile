import React, { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  PostsProfileTab,
  ProductsProfileTab,
  AboutProfileTab,
  JobsProfileTab,
  CalendarProfileTab,
  TopTabContainer,
} from "../components/customized";

const TopTabNavigator = (props) => {
  const { role, userId } = props;
  const Tab = createMaterialTopTabNavigator();

  console.log("RENDER TOP TABS");

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} />,
    [userId]
  );
  const ProductsProfile = useCallback(
    () => <ProductsProfileTab userId={userId} />,
    [userId]
  );
  const AboutProfile = () => (
    <AboutProfileTab
      biography={props?.biography}
      website={props?.website}
      location={props?.location}
    />
  );

  const topTab = (
    <TopTabContainer
      initialRouteName="Posts"
      profileTabs={true}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="Posts" component={PostsProfile} />
      <Tab.Screen name="Products" component={ProductsProfile} />
      <Tab.Screen name="Calendar" component={CalendarProfileTab} />
      <Tab.Screen name="Jobs" component={JobsProfileTab} />
      <Tab.Screen name="About" component={AboutProfile} />
    </TopTabContainer>
  );

  return <>{topTab}</>;
};

export default TopTabNavigator;
