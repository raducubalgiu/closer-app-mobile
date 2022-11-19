import { StyleSheet, Text, FlatList, Pressable } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

const { grey0, black } = theme.lightColors;

export const ServicesList = ({ services }) => {
  const navigation = useNavigation();

  const goToFilters = (item) =>
    navigation.navigate("FiltersDate", {
      service: item,
      period: { code: 0 },
    });

  const renderService = useCallback(
    ({ item }) => (
      <Pressable style={styles.serviceBtn} onPress={() => goToFilters(item)}>
        <Text style={styles.servicesTitle}>{item.name}</Text>
      </Pressable>
    ),
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

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
    color: black,
    fontSize: 15,
  },
  seeAll: {
    fontSize: 12.5,
    color: grey0,
  },
  serviceBtn: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginLeft: 10,
    minWidth: 90,
  },
  servicesTitle: {
    textAlign: "center",
    fontSize: 13,
    color: black,
    fontWeight: "500",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
