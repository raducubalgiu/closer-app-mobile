import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Divider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import theme from "../../../assets/styles/theme";

const ServicesCategories = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services`)
      .then((resp) => {
        setServices(resp.data.services);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.servicesContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.servicesHeading}>{t("servicesHeading")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllServices")}>
          <Text style={styles.seeAllHeading}>{t("seeAll")}</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <FlatList
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Services", {
                  serviceId: item._id,
                  serviceName: item.name,
                })
              }
            >
              <Image
                style={styles.image}
                source={{
                  uri: item?.logo[0]?.url,
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
    paddingVertical: 10,
    marginTop: 5,
    flex: 1,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 5,
  },
  servicesHeading: {
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  seeAllHeading: {
    fontSize: 12.5,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.grey0,
  },
  servicesTitle: {
    marginTop: 10,
    maxWidth: 150,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 13,
  },
  serviceItem: {
    alignItems: "center",
    marginRight: 20,
    paddingVertical: 20,
    flex: 1,
    paddingHorizontal: 5,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
