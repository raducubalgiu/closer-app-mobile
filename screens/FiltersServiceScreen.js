import { StyleSheet, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/core";
import { FiltersContainer, SheetHeader } from "../components/customized";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black, primary } = theme.lightColors;

const FiltersServiceScreen = ({ route }) => {
  const navigation = useNavigation();
  const { service, period } = route.params;
  const { filters } = service;
  const [option, setOption] = useState("");
  const { t } = useTranslation();

  const activeBtn = {
    ...styles.button,
    backgroundColor: "#bbb",
  };
  const activeBtnTxt = {
    ...styles.buttonText,
    color: "white",
    fontWeight: "600",
  };

  const goToLocations = () =>
    navigation.navigate("Locations", {
      service,
      option,
      period,
    });

  const renderOption = useCallback(
    ({ item }) => (
      <Button
        onPress={() => setOption(item)}
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
      onNext={goToLocations}
      btnTitle={t("search")}
    >
      <SheetHeader
        title={service?.name}
        description={option ? option?.name : "-"}
      />
      <FlatList
        bounces={false}
        data={filters[0]?.options}
        keyExtractor={(item) => item._id}
        renderItem={renderOption}
      />
    </FiltersContainer>
  );
};

export default FiltersServiceScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: primary,
    flex: 1,
  },
  mainHeading: { color: "white", fontSize: 28 },
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
    color: black,
    fontWeight: "500",
  },
});
