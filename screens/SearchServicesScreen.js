import { SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import {
  Button,
  IconBackButton,
  SearchBarInput,
  Stack,
} from "../components/core";
import { useAuth } from "../hooks";

const SUGGESTED_SERVICES = [
  {
    _id: "1",
    name: "Tuns",
    category: [{ _id: "1", name: "Frizerii, saloane de infrumusetare" }],
  },
  {
    _id: "2",
    name: "Pensat",
    category: [{ _id: "2", name: "Frizerii, saloane de infrumusetare" }],
  },
  {
    _id: "3",
    name: "Restaurant",
    category: [{ _id: "3", name: "Restaurante, baruri" }],
  },
];

const SearchServicesScreen = ({ route }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { period } = route.params || {};

  const updateSearch = useCallback(
    (search) => {
      setSearch(search);
      if (search) {
        axios
          .get(`${process.env.BASE_ENDPOINT}/services/search/?name=${search}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
          })
          .then((res) => setServices(res.data))
          .catch((err) => console.log(err));
      } else {
        setServices([]);
      }
    },
    [search]
  );

  const goToFilters = (item) => {
    navigation.navigate("FiltersDate", {
      serviceId: item._id,
      serviceName: item.name,
      period,
    });
  };

  const renderSuggested = useCallback(({ item }) => {
    <Button onPress={() => goToFilters(item)} sx={styles.item}>
      <Text style={styles.serviceItem}>{item.name}</Text>
      <Text style={styles.categoryItem}>{item.category.name}</Text>
    </Button>;
  }, []);

  const renderServices = useCallback(
    ({ item }) => (
      <Button onPress={() => goToFilters(item)} sx={styles.item}>
        <Text style={styles.serviceItem}>{item.name}</Text>
        <Text style={styles.categoryItem}>{item.categoryName}</Text>
      </Button>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
        <IconBackButton sx={{ marginRight: 10 }} />
        <SearchBarInput
          autoFocus={true}
          placeholder={t("searchService")}
          value={search}
          onChangeText={updateSearch}
          cancelButtonTitle=""
        />
      </Stack>
      <FlatList
        data={services.length > 0 ? services : SUGGESTED_SERVICES}
        keyExtractor={(item) => item._id}
        renderItem={services.length > 0 ? renderServices : renderSuggested}
        ListFooterComponent={
          <>
            {services.length === 0 && (
              <Text style={styles.heading}>{t("suggested")}</Text>
            )}
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </SafeAreaView>
  );
};

export default SearchServicesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    textTransform: "uppercase",
    fontFamily: "Exo-SemiBold",
    paddingTop: 15,
    paddingBottom: 10,
  },
  item: {
    paddingVertical: 17,
  },
  serviceItem: {
    textTransform: "uppercase",
    fontSize: 13,
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
  },
  categoryItem: {
    color: theme.lightColors.grey0,
  },
});
