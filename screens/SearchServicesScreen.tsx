import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { useCallback, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
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

const { black, grey0 } = theme.lightColors;

export const SearchServicesScreen = ({ route }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { period } = route.params || {};

  const updateSearch = useCallback(
    (search) => {
      const controller = new AbortController();
      setSearch(search);
      if (search) {
        axios
          .get(
            `${process.env.BASE_ENDPOINT}/services/search?search=${search}&page=1&limit=5`,
            {
              signal: controller.signal,
              headers: { Authorization: `Bearer ${user?.token}` },
            }
          )
          .then((res) => setServices(res.data.results))
          .catch((err) => console.log(err));
      } else {
        setServices([]);
      }

      return () => {
        controller.abort();
      };
    },
    [search]
  );

  const goToFilters = (item) => {
    navigation.navigate("FiltersDate", {
      service: item,
      period,
    });
  };

  const renderSuggested = useCallback(({ item }) => {
    <Pressable onPress={() => goToFilters(item)} style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.category.name}</Text>
    </Pressable>;
  }, []);

  const renderServices = useCallback(
    ({ item }) => (
      <Pressable onPress={() => goToFilters(item)} style={styles.item}>
        <Text style={styles.service}>{item.name}</Text>
        <Text style={styles.locationsCount}>
          {item.locationsCount} {t("locations")}
        </Text>
      </Pressable>
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
        keyboardShouldPersistTaps={"handled"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    textTransform: "uppercase",
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: "600",
    fontSize: 15.5,
  },
  item: {
    paddingVertical: 15,
  },
  service: {
    textTransform: "uppercase",
    color: black,
    fontWeight: "600",
    fontSize: 15.5,
  },
  locationsCount: {
    color: grey0,
    fontSize: 14.5,
  },
});
