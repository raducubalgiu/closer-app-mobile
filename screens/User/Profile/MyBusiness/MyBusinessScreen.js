import { StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";
import MyBusinessCard from "../../../../components/customized/Cards/MyBusinessCard";
import { useNavigation } from "@react-navigation/native";

const MyBusinessScreen = () => {
  const navigation = useNavigation();

  const SCREENS = [
    {
      _id: "1",
      title: "Dashboard",
      iconName: "airplay",
      iconType: "feather",
      description: "Statistici privind programarile",
      navigation: "MyDashboard",
    },
    {
      _id: "2",
      title: "Calendar",
      iconName: "calendar",
      iconType: "feather",
      description: "Gestioneaza-ti programarile",
      navigation: "MyCalendar",
    },
    {
      _id: "3",
      title: "Locatie",
      iconName: "navigation",
      iconType: "feather",
      description: "Informatii despre locatia adaugata",
      navigation: "MyLocation",
    },
    {
      _id: "4",
      title: "Servicii",
      iconName: "trending-up",
      iconType: "feather",
      description: "Poti edita oricand serviciile tale",
      navigation: "AddServices",
    },
    {
      _id: "5",
      title: "Produse",
      iconName: "shopping-bag",
      iconType: "feather",
      description: "Poti edita oricand produsele tale",
      navigation: "MyProducts",
    },
    {
      _id: "6",
      title: "Joburi",
      iconName: "briefcase",
      iconType: "feather",
      description: "Poti adauga joburi pentru business-ul tau",
      navigation: "MyProducts",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Panoul de bord" />
      <FlatList
        data={SCREENS}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={{ margin: 10 }}
        bounces={false}
        numColumns={2}
        renderItem={({ item }) => (
          <MyBusinessCard
            title={item.title}
            iconName={item?.iconName}
            iconType={item?.iconType}
            description={item?.description}
            onPress={() => navigation.navigate(`${item?.navigation}`)}
          />
        )}
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
