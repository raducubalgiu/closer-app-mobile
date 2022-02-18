import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Divider } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../assets/styles/Colors";
import axios from "axios";

const ServicesCategories = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.100.2:8000/api/v1/services")
      .then((resp) => {
        setServices(resp.data.services);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.servicesContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 20,
          paddingTop: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.servicesHeading}>{t("servicesHeading")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllServices")}>
          <Text style={styles.seeAllHeading}>{t("seeAll")}</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <FlatList
        nestedScrollEnabled={true}
        horizontal
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              marginRight: 20,
              paddingVertical: 20,
              flex: 1,
              paddingHorizontal: 5,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Services", {
                  serviceId: item._id,
                  serviceName: item.name,
                })
              }
            >
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                }}
                source={{
                  uri: item.image,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.servicesTitle}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ServicesCategories;

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
  servicesHeading: {
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  seeAllHeading: {
    color: Colors.textDark,
    fontSize: 12,
    fontFamily: "Exo-SemiBold",
    color: Colors.textLight,
  },
  servicesTitle: {
    marginTop: 10,
    maxWidth: 150,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 13,
  },
});
