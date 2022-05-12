import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import {
  Accordion,
  Stack,
  SearchBarInput,
  Spinner,
  Button,
} from "../components/core";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";

const AllServicesScreen = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/categories`)
      .then((resp) => {
        setCategories(resp.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const updateSearch = useCallback(
    (search) => {
      setSearch(search);
      if (search) {
        //   axios
        //     .get(`${process.env.BASE_ENDPOINT}/services/search/?name=${search}`, {
        //       headers: { Authorization: `Bearer ${user?.token}` },
        //     })
        //     .then((res) => {
        //       setServices(res.data.services);
        //     })
        //     .catch((err) => console.log(err));
        // } else {
        //   setServices([]);
      }
    },
    [search]
  );

  const ServiceItem = ({ name, _id, servicesCount }) => (
    <Button
      onPress={() =>
        navigation.navigate("Services", {
          serviceId: _id,
          serviceName: name,
          period: {
            code: process.env.ANYTIME_CODE,
            type: t("anytime"),
          },
        })
      }
      sx={{
        marginTop: 15,
      }}
    >
      <Text style={styles.service}>{name}</Text>
      <Divider color="#ddd" style={{ marginTop: 15 }} />
    </Button>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.servicesContainer}>
        <Stack direction="row" justify="start">
          <Button sx={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color={theme.lightColors.black}
              size={22.5}
            />
          </Button>
          <SearchBarInput
            autoFocus={false}
            placeholder={t("search")}
            value={search}
            updateValue={updateSearch}
            cancelButtonTitle={""}
            height={60}
            showLoading={loadingSearch}
          />
        </Stack>
        {loading && <Spinner />}
        {!loading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((category, i) => (
              <Accordion
                key={i}
                title={category?.name}
                initExpand={true}
                sx={styles.accordion}
              >
                {category?.services?.map((service, i) => (
                  <ServiceItem
                    key={i}
                    name={service?.name}
                    _id={service?._id}
                    servicesCount={`100 rezultate`}
                  />
                ))}
              </Accordion>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllServicesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  servicesContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  accordion: {
    marginTop: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 7.5,
    paddingHorizontal: 5,
    borderRadius: 2.5,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    textTransform: "uppercase",
    color: theme.lightColors.black,
  },
  results: {
    fontFamily: "Exo-Medium",
  },
});
