import { StyleSheet, Text, SafeAreaView, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import { Accordion, Spinner, Button, Header } from "../components/core";
import theme from "../assets/styles/theme";
import { useHttpGet } from "../hooks";

const AllServicesScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data: categories, loading } = useHttpGet("/categories");

  const goToServices = () =>
    navigation.navigate("Services", {
      serviceId: _id,
      serviceName: name,
      period: {
        code: process.env.ANYTIME_CODE,
        type: t("anytime"),
      },
    });

  const ServiceItem = useCallback(
    ({ name }) => (
      <Button onPress={goToServices} sx={{ marginTop: 15 }}>
        <Text style={styles.service}>{name}</Text>
        <Divider color="#ddd" style={{ marginTop: 15 }} />
      </Button>
    ),
    []
  );

  const renderCategories = useCallback(
    ({ item }) => (
      <Accordion title={item?.name} initExpand={true} sx={styles.accordion}>
        {item?.services?.map((service) => (
          <ServiceItem
            key={service._id}
            name={service?.name}
            _id={service?._id}
            servicesCount={`100 rezultate`}
          />
        ))}
      </Accordion>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.servicesContainer}>
        <Header title={t("categories")} divider />
        {loading && <Spinner />}
        {!loading && (
          <FlatList
            data={categories}
            showsVerticalScrollIndicator={false}
            initialNumToRender={4}
            keyExtractor={keyExtractor}
            renderItem={renderCategories}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllServicesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  servicesContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  accordion: {
    marginTop: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 7.5,
    paddingHorizontal: 5,
    borderRadius: 2.5,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    textTransform: "uppercase",
    color: theme.lightColors.black,
  },
  results: {
    fontFamily: "Exo-Medium",
  },
});
