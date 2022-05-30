import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";
import MyBusinessCard from "../../../../components/customized/Cards/MyBusinessCard";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const MyBusinessScreen = () => {
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
    },
    {
      _id: "2",
      title: "Calendar",
      iconName: "calendar",
      iconType: "feather",
      description: t("manageYourSchedules"),
      navigation: "MyCalendar",
    },
    {
      _id: "3",
      title: t("location"),
      iconName: "navigation",
      iconType: "feather",
      description: t("informationLocation"),
      navigation: "MyLocation",
    },
    {
      _id: "4",
      title: t("locationSchedule"),
      iconName: "clock",
      iconType: "feather",
      description: t("informationLocationSchedule"),
      navigation: "AddSchedule",
    },
    {
      _id: "5",
      title: t("services"),
      iconName: "trending-up",
      iconType: "feather",
      description: t("youCanEditServices"),
      navigation: "AddServices",
    },
    {
      _id: "6",
      title: t("products"),
      iconName: "shopping-bag",
      iconType: "feather",
      description: t("youCanEditProducts"),
      navigation: "MyProducts",
    },
    {
      _id: "7",
      title: t("jobs"),
      iconName: "briefcase",
      iconType: "feather",
      description: t("youCanAddJobs"),
      navigation: "MyJobs",
    },
  ];

  const renderCard = ({ item }) => (
    <MyBusinessCard
      title={item.title}
      iconName={item?.iconName}
      iconType={item?.iconType}
      description={item?.description}
      onPress={() => navigation.navigate(`${item?.navigation}`)}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myBusiness")} />
      <FlatList
        data={SCREENS}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={{ margin: 10 }}
        numColumns={2}
        renderItem={renderCard}
      />
    </SafeAreaView>
  );
};

export default MyBusinessScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
