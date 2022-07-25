import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Stack, Spinner, Button, MainButton } from "../components/core";
import { SheetHeader } from "../components/customized";
import theme from "../assets/styles/theme";
import { useSheetView } from "../hooks";
import { useTranslation } from "react-i18next";

const FiltersServiceScreen = ({ route }) => {
  const navigation = useNavigation();
  const { serviceId, serviceName, period } = route.params;
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}`)
      .then((res) => {
        setFilter(res.data.service.filters[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [serviceId]);

  const disabledStyle = { ...styles.mainButton, backgroundColor: "#ccc" };

  const goToServices = () =>
    navigation.navigate("Locations", {
      serviceId,
      serviceName,
      optionId: option?._id,
      period,
    });

  const renderOption = ({ item }) => (
    <Button
      onPress={() => {
        setDisabled(false);
        setOption(item);
      }}
      sx={
        item._id !== option._id
          ? styles.button
          : { ...styles.button, backgroundColor: "#bbb" }
      }
    >
      <Text
        style={
          item._id !== option._id
            ? styles.buttonText
            : { ...styles.buttonText, color: "white" }
        }
      >
        {item?.name}
      </Text>
    </Button>
  );

  const sheetContent = (
    <>
      <SheetHeader
        title={`Filtru - ${filter?.name}`}
        description={option?.name}
      />
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          bounces={false}
          data={filter?.options}
          keyExtractor={(item) => item._id}
          renderItem={renderOption}
        />
      )}
    </>
  );
  const footerContent = (
    <Stack direction="row" justify="end" sx={styles.footerContainer}>
      <MainButton
        title={t("next")}
        size="lg"
        onPress={goToServices}
        style={disabled ? disabledStyle : styles.mainButton}
      />
    </Stack>
  );

  const { BOTTOM_SHEET } = useSheetView(
    ["75%", "90%"],
    sheetContent,
    footerContent
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Stack align="start" sx={{ margin: 25 }}>
        <Text style={styles.mainHeading}>Filtreaza</Text>
        <Text style={styles.mainHeading}>serviciile</Text>
      </Stack>
      {BOTTOM_SHEET}
    </SafeAreaView>
  );
};

export default FiltersServiceScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.lightColors.primary,
    flex: 1,
  },
  mainHeading: { color: "white", fontFamily: "Exo-ExtraBold", fontSize: 28 },
  footerContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#eee",
    marginHorizontal: 10,
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
  },
});
