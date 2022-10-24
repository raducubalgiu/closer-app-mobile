import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { PostsProfileTab } from "../ProfileTabs/PostsProfileTab";
import { ProductsProfileTab } from "../ProfileTabs/ProductsProfileTab";
import { AboutProfileTab } from "../ProfileTabs/AboutProfileTab";
import { useTranslation } from "react-i18next";
import { ProfileOverview } from "../../ProfileOverview/ProfileOverview";
import { MAIN_ROLE } from "@env";
import { Protected } from "../../../core";

export const ProfileCollapsableTabs = ({
  user,
  headerButtons,
  services,
  service,
  option,
  initialTab,
}) => {
  const { _id, name, role, username, avatar } = user;
  const { t } = useTranslation();

  const Header = () => {
    return (
      <ProfileOverview
        user={user}
        name={name}
        username={username}
        avatar={avatar}
      >
        {headerButtons}
      </ProfileOverview>
    );
  };

  const postsProfile = <PostsProfileTab userId={_id} />;
  const productsProfile = (
    <ProductsProfileTab userId={_id} service={service} option={option} />
  );
  const aboutProfile = <AboutProfileTab />;

  const tabs = [
    {
      _id: 1,
      name: "Posts",
      label: t("posts"),
      tab: postsProfile,
      protected: [],
    },
    {
      _id: 2,
      name: "Products",
      label: t("products"),
      tab: productsProfile,
      protected: [MAIN_ROLE],
    },
    {
      _id: 3,
      name: "About",
      label: t("about"),
      tab: aboutProfile,
      protected: [],
    },
  ];

  return (
    <Tabs.Container
      renderHeader={Header}
      allowHeaderOverscroll={true}
      headerContainerStyle={{ shadowColor: "transparent" }}
      initialTabName={initialTab}
      lazy={true}
    >
      {tabs.map((t, i) => (
        <Tabs.Tab key={i} name={t.name} label={t.label}>
          {t.tab}
        </Tabs.Tab>
      ))}
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({});
