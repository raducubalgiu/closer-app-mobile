import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../components/core";
import { CardServiceOverview } from "../components/customized";

const ServiceScreen = ({ route }) => {
  const { _id, name, postsCount } = route.params.service;

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <CardServiceOverview
        serviceId={_id}
        postsCount={postsCount}
        name={name}
      />
      <Text>ServiceScreen</Text>
    </SafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
});
