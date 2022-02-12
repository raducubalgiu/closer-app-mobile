import React, { useEffect, useState } from "react";
import { Divider, SearchBar } from "react-native-elements";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../assets/styles/Colors";
import { DUMMY_SERVICES } from "../dummy-data/dummyServices";

const SearchScreen = () => {
  const [data, setData] = useState(DUMMY_SERVICES);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigation = useNavigation();

  console.log(data);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    let services = data.filter(
      (item) => item.service.toLowerCase().indexOf(search.toLowerCase()) >= 0
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
        inputContainerStyle={{ backgroundColor: "white", borderRadius: "none" }}
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
            <Text style={styles.heading}>Sugerate</Text>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.serviceItem}>Tuns</Text>
              <Text style={styles.categoryItem}>Saloane de imfrumusetare</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.item}>
              <Text style={styles.serviceItem}>Restaurant</Text>
              <Text style={styles.categoryItem}>Restaurante</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.item}>
              <Text style={styles.serviceItem}>Pensat</Text>
              <Text style={styles.categoryItem}>Saloane de imfrumusetare</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.item}>
              <Text style={styles.serviceItem}>ITP</Text>
              <Text style={styles.categoryItem}>Service-uri auto</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.item}>
              <Text style={styles.serviceItem}>Bowling</Text>
              <Text style={styles.categoryItem}>Baruri</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <FlatList
              data={filteredServices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.serviceItem}>{item.service}</Text>
                  <Text style={styles.categoryItem}>{item.category}</Text>
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
