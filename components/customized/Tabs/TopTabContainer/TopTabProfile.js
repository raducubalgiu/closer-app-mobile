import React, { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopTabContainer } from "./TopTabContainer";
import { PostsProfileTab } from "../ProfileTabs/PostsProfileTab";
import { ProductsProfileTab } from "../ProfileTabs/ProductsProfileTab";
import { JobsProfileTab } from "../ProfileTabs/JobsProfileTab";
import { AboutProfileTab } from "../ProfileTabs/AboutProfileTab";
import { TabBadge } from "../TabBadge/TabBadge";
import { useHttpGet } from "../../../../hooks";

export const TopTabProfile = ({ userId, username, service, option, user }) => {
  const Tab = createMaterialTopTabNavigator();
  const { description, website, location, role, hours, counter } = user;

  const { data: services } = useHttpGet(
    `/locations/${user?.location}/services`
  );

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} username={username} />,
    [userId, username]
  );
  const ProductsProfile = useCallback(
    () => (
      <ProductsProfileTab
        userId={userId}
        services={services}
        service={service}
        option={option}
      />
    ),
    [userId, services, service, option]
  );
  const JobsProfile = useCallback(
    () => <JobsProfileTab userId={userId} username={username} />,
    [userId, username]
  );
  const AboutProfile = useCallback(
    () => (
      <AboutProfileTab
        biography={description}
        website={website}
        location={location}
        role={role}
        hours={hours}
      />
    ),
    [description, website, location, role, hours]
  );

  return (
    <TopTabContainer initialRouteName="Posts" profileTabs={true}>
      <Tab.Screen name="Posts" component={PostsProfile} />
      <Tab.Screen
        name="Products"
        component={ProductsProfile}
        options={{
          tabBarIcon: () => <TabBadge value={counter?.productsCount} />,
        }}
      />
      <Tab.Screen name="Jobs" component={JobsProfile} />
      <Tab.Screen name="About" component={AboutProfile} />
    </TopTabContainer>
  );
};
