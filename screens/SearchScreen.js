import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import SearchBarInput from "../components/core/Inputs/SearchBarInput";

const SearchScreen = () => {
  const [initialServices, setInitialServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigation = useNavigation();

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services`)
      .then((resp) => {
        setInitialServices(resp.data.services);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let services = initialServices.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );

    setFilteredServices(services);
  }, [search]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <SearchBarInput
          autoFocus={true}
          placeholder="Ce serviciu cauti?"
          value={search}
          updateValue={updateSearch}
        />
        {search == "" ? (
          <View>
            <Text style={styles.heading}>{t("suggested")}</Text>
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("Filters", {
                  serviceId: "6209039fcf0acaf67b38c5b1",
                  serviceName: "Tuns",
                })
              }
            >
              <Text style={styles.serviceItem}>Tuns</Text>
              <Text style={styles.categoryItem}>
                Frizerie, saloane de infrumusetare
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("Filters", {
                  serviceId: "620904d695c3c5b40ba87fc3",
                  serviceName: "Restaurant",
                })
              }
            >
              <Text style={styles.serviceItem}>Restaurant</Text>
              <Text style={styles.categoryItem}>Restaurante, baruri</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("Filters", {
                  serviceId: "620a99f49b162da2c7108338",
                  serviceName: "Pensat",
                })
              }
            >
              <Text style={styles.serviceItem}>Pensat</Text>
              <Text style={styles.categoryItem}>
                Frizerie, saloane de infrumusetare
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("Filters", {
                  serviceId: "620904ad95c3c5b40ba87fc1",
                  serviceName: "ITP",
                })
              }
            >
              <Text style={styles.serviceItem}>ITP</Text>
              <Text style={styles.categoryItem}>
                Service-uri auto, spalatorii auto, parcari
              </Text>
            </TouchableOpacity>
            <Divider />
          </View>
        ) : (
          <View>
            <FlatList
              data={filteredServices}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("FiltersDate", {
                      serviceId: item._id,
                      serviceName: item.name,
                    })
                  }
                  style={styles.item}
                >
                  <Text style={styles.serviceItem}>{item.name}</Text>
                  <Text style={styles.categoryItem}>{item.category.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

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
