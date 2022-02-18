import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, SearchBar } from "react-native-elements";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../assets/styles/Colors";

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
      .get("http://192.168.100.2:8000/api/v1/services")
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
      <SearchBar
        onCancel={() => navigation.goBack()}
        platform="ios"
        cancelButtonTitle={t("cancel")}
        cancelButtonProps={{
          color: "gray",
          buttonTextStyle: {
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "Exo-SemiBold",
            color: Colors.textDark,
            backgroundColor: "white",
            padding: 15,
            marginRight: 15,
          },
        }}
        autoFocus={true}
        containerStyle={{
          backgroundColor: "white",
          borderStyle: "dashed",
          paddingHorizontal: 5,
        }}
        inputContainerStyle={
          Platform == "ios"
            ? { backgroundColor: "white", borderRadius: "none" }
            : { backgroundColor: "white" }
        }
        inputStyle={{
          backgroundColor: "white",
          fontSize: 15,
          color: Colors.textLight,
          fontFamily: "Exo-Regular",
        }}
        placeholder={t("searchInputTitle")}
        onChangeText={updateSearch}
        value={search}
      />
      <View style={styles.container}>
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
                    navigation.navigate("Filters", {
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
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    textTransform: "uppercase",
    fontFamily: "Exo-SemiBold",
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  item: {
    paddingVertical: 17,
  },
  serviceItem: {
    textTransform: "uppercase",
    paddingLeft: 15,
    fontSize: 13,
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
  },
  categoryItem: {
    color: Colors.textLight,
    paddingLeft: 15,
  },
});
