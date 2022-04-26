import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Header from "../../../../components/customized/Headers/Header";
import { Stack } from "../../../../components/core";
import MyBusinessCard from "../../../../components/customized/Cards/MyBusinessCard";
import { useNavigation } from "@react-navigation/native";

const MyBusinessScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Afacerea mea" />
      <Stack justify="start" sx={{ margin: 15 }}>
        <Stack direction="row" sx={{ marginBottom: 10 }}>
          <MyBusinessCard
            title="Dashboard"
            iconName="dashboard"
            iconType="antdesign"
            description="Statistici privind programarile"
            onPress={() => navigation.navigate("MyDashboard")}
          />
          <MyBusinessCard
            title="Calendar"
            iconName="calendar"
            iconType="antdesign"
            description="Gestioneaza-ti programarile"
            sx={{ marginLeft: 10 }}
            onPress={() => navigation.navigate("MyCalendar")}
          />
        </Stack>
        <Stack direction="row">
          <MyBusinessCard
            title="Locatie"
            iconName="enviromento"
            iconType="antdesign"
            description="Informatii despre locatia adaugata"
            onPress={() => navigation.navigate("MyLocation")}
          />
          <MyBusinessCard
            title="Produse"
            iconName="shopping-bag"
            iconType="feather"
            description="Poti edita oricand produsele tale"
            sx={{ marginLeft: 10 }}
            onPress={() => navigation.navigate("MyProducts")}
          />
        </Stack>
      </Stack>
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
