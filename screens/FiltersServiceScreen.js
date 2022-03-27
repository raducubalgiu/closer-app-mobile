import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomSheetFilter from "../components/BottomSheets/BottomSheetFilter";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../assets/styles/Colors";

const FiltersServiceScreen = (props) => {
  const navigation = useNavigation();
  const { serviceId, serviceName } = props.route.params;
  const [filter, setFilter] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState("");

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/services/${serviceId}/filters`)
      .then((res) => {
        setFilter(res.data.filters[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BottomSheetFilter
      screenFirstTitle="Filtreaza"
      screenSecondTitle="serviciile"
      sheetFirstTitle={`Filtru - ${filter?.name}`}
      sheetSecondTitle={option?.name}
      bottomSheetBody={
        <FlatList
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
                  : { ...styles.button, backgroundColor: Colors.primary }
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
          option: option?._id,
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
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
  },
});
