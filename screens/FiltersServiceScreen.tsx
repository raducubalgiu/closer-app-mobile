import {
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FiltersContainer, SheetHeader } from "../components/customized";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Option } from "../models/option";

const { black, primary } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "FiltersService">;

export const FiltersServiceScreen = ({ route }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { service, period } = route.params;
  const { filters } = service;
  const [option, setOption] = useState<Option>(null);
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
    });

  const renderOption = useCallback(
    ({ item }: ListRenderItemInfo<Option>) => (
      <Pressable
        onPress={() => setOption(item)}
        style={item._id !== option._id ? styles.button : activeBtn}
      >
        <Text
          style={item._id !== option._id ? styles.buttonText : activeBtnTxt}
        >
          {item?.name}
        </Text>
      </Pressable>
    ),
    [activeBtn, activeBtnTxt]
  );

  return (
    <FiltersContainer
      headerTitle={"Filtreaza"}
      headerDescription={"serviciile"}
      onNext={goToLocations}
      btnTitle={t("search")}
      disabled={!option}
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
