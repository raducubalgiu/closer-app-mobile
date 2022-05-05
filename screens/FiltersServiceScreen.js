import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import BottomSheetFilter from "../components/customized/BottomSheets/BottomSheetFilter";

const FiltersServiceScreen = (props) => {
  const navigation = useNavigation();
  const { serviceId, serviceName } = props.route.params;
  const [filter, setFilter] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}`)
      .then((res) => {
        setFilter(res.data.service.filters[0]);
      })
      .catch((error) => console.log(error));
  }, [serviceId]);

  return (
    <BottomSheetFilter
      screenFirstTitle="Filtreaza"
      screenSecondTitle="serviciile"
      sheetFirstTitle={`Filtru - ${filter?.name}`}
      sheetSecondTitle={option?.name}
      bottomSheetBody={
        <FlatList
          bounces={false}
          data={filter?.options}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setDisabled(false);
                setOption(item);
              }}
              style={
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
            </TouchableOpacity>
          )}
        />
      }
      mainButtonText="Cauta"
      disabled={disabled}
      onGoBack={() => navigation.goBack()}
      onGoNext={() =>
        navigation.navigate("Services", {
          serviceId,
          serviceName,
          optionId: option?._id,
        })
      }
    />
  );
};

export default FiltersServiceScreen;

const styles = StyleSheet.create({
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
