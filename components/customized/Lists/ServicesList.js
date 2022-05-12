import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@rneui/themed";
import { useAuth } from "../../../context/auth";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";

export const ServicesList = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((resp) => {
        setServices(resp.data.services);
        console.log("FetchServices");
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Stack direction="row" sx={styles.headingContainer}>
        <Text style={styles.heading}>{t("servicesHeading")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllServices")}>
          <Text style={styles.seeAll}>{t("seeAll")}</Text>
        </TouchableOpacity>
      </Stack>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginTop: 5,
    flex: 1,
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
