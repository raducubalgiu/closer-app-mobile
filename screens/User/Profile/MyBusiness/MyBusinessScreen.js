import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useCallback } from "react";
import { Header, Protected } from "../../../../components/core";
import MyBusinessCard from "../../../../components/customized/Cards/MyBusinessCard";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";

export const MyBusinessScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const SCREENS = [
    {
      _id: "1",
      title: "Dashboard",
      iconName: "airplay",
      iconType: "feather",
      description: t("scheduleStatistics"),
      navigation: "MyDashboard",
      roles: [MAIN_ROLE, SECOND_ROLE],
    },
    {
      _id: "2",
      title: "Calendar",
      iconName: "calendar",
      iconType: "feather",
      description: t("manageYourSchedules"),
      navigation: "MyCalendar",
      roles: [MAIN_ROLE, SECOND_ROLE],
    },
    {
      _id: "3",
      title: t("location"),
      iconName: "navigation",
      iconType: "feather",
      description: t("informationLocation"),
      navigation: "MyLocation",
      roles: [MAIN_ROLE],
    },
    {
      _id: "4",
      title: t("locationSchedule"),
      iconName: "clock",
      iconType: "feather",
      description: t("informationLocationSchedule"),
      navigation: "AddSchedule",
      roles: [MAIN_ROLE],
    },
    {
      _id: "5",
      title: t("services"),
      iconName: "trending-up",
      iconType: "feather",
      description: t("youCanEditServices"),
      navigation: "AddServices",
      roles: [MAIN_ROLE],
    },
    {
      _id: "6",
      title: t("products"),
      iconName: "shopping-bag",
      iconType: "feather",
      description: t("youCanEditProducts"),
      navigation: "MyProducts",
      roles: [MAIN_ROLE, SECOND_ROLE],
    },
    {
      _id: "7",
      title: t("jobs"),
      iconName: "briefcase",
      iconType: "feather",
      description: t("youCanAddJobs"),
      navigation: "MyJobs",
      roles: [MAIN_ROLE],
    },
  ];

  const renderCard = useCallback(
    ({ item }) => (
      <Protected userRole={user?.role} roles={item?.roles}>
        <MyBusinessCard
          title={item.title}
          iconName={item?.iconName}
          iconType={item?.iconType}
          description={item?.description}
          onPress={() => navigation.navigate(`${item?.navigation}`)}
        />
      </Protected>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myBusiness")} />
      <FlatList
        data={SCREENS}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ margin: 10 }}
        numColumns={2}
        renderItem={renderCard}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
