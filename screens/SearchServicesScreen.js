import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { SearchBarInput, Stack } from "../components/core";
import { useAuth } from "../context/auth";

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
  const { period } = route.params;
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const updateSearch = (search) => {
    setSearch(search);
    if (search) {
      axios
        .get(`${process.env.BASE_ENDPOINT}/services/search/?name=${search}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setServices(res.data.services);
        })
        .catch((err) => console.log(err));
    } else {
      setServices([]);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
        <SearchBarInput
          autoFocus={true}
          placeholder={t("searchService")}
          value={search}
          updateValue={updateSearch}
          cancelButtonTitle={t("cancel")}
          onPress={() => navigation.goBack()}
        />
      </Stack>
      <View style={styles.container}>
        <View>
          {services.length === 0 && (
            <Text style={styles.heading}>{t("suggested")}</Text>
          )}
          <FlatList
            data={services.length > 0 ? services : SUGGESTED_SERVICES}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FiltersDate", {
                    serviceId: item._id,
                    serviceName: item.name,
                    period,
                  });
                }}
                style={styles.item}
              >
                <Text style={styles.serviceItem}>{item.name}</Text>
                <Text style={styles.categoryItem}>{item.category[0].name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchServicesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
