import { StyleSheet, Text, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { Button } from "../../core";
import { useHttpGet } from "../../../hooks";

export const ServicesList = () => {
  const navigation = useNavigation();

  const { data: services } = useHttpGet(`/services`);

  const goToFilters = (item) =>
    navigation.navigate("FiltersDate", {
      service: item,
      period: { code: 0 },
    });

  const renderService = useCallback(
    ({ item }) => (
      <Button sx={styles.serviceBtn} onPress={() => goToFilters(item)}>
        <Text style={styles.servicesTitle}>{item.name}</Text>
      </Button>
    ),
    []
  );
  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={services}
      keyExtractor={keyExtractor}
      renderItem={renderService}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    paddingRight: 15,
  },
  headingContainer: {
    paddingBottom: 20,
    paddingTop: 5,
  },
  heading: {
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  seeAll: {
    fontSize: 12.5,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.grey0,
  },
  serviceBtn: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
    minWidth: 90,
  },
  servicesTitle: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 13,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
