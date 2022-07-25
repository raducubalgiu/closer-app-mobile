import { StyleSheet, Text, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/core";
import { FiltersContainer, SheetHeader } from "../components/customized";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";

const FiltersServiceScreen = ({ route }) => {
  const navigation = useNavigation();
  const { serviceId, serviceName, startDate, endDate } = route.params;
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}`)
      .then((res) => {
        setFilter(res.data.service.filters[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [serviceId]);

  const activeBtn = { ...styles.button, backgroundColor: "#bbb" };
  const activeBtnTxt = { ...styles.buttonText, color: "white" };

  const goToServices = () =>
    navigation.navigate("Locations", {
      serviceId,
      serviceName,
      optionId: option?._id,
      startDate,
      endDate,
    });

  const renderOption = useCallback(
    ({ item }) => (
      <Button
        onPress={() => {
          setDisabled(false);
          setOption(item);
        }}
        sx={item._id !== option._id ? styles.button : activeBtn}
      >
        <Text
          style={item._id !== option._id ? styles.buttonText : activeBtnTxt}
        >
          {item?.name}
        </Text>
      </Button>
    ),
    [activeBtn, activeBtnTxt]
  );

  return (
    <FiltersContainer
      headerTitle={"Filtreaza"}
      headerDescription={"serviciile"}
      footerJustify="end"
      onNext={goToServices}
    >
      <SheetHeader
        title={`Filtru - ${filter?.name}`}
        description={option?.name}
      />
      <FlatList
        bounces={false}
        data={filter?.options}
        keyExtractor={(item) => item._id}
        renderItem={renderOption}
      />
    </FiltersContainer>
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
