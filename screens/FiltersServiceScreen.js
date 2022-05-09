import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { Stack } from "../components/core";
import { SheetHeader } from "../components/customized";

const FiltersServiceScreen = (props) => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "90%"], []);
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

  const disabledStyle = { ...styles.mainButton, backgroundColor: "#ccc" };

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props}>
        <Stack direction="row" justify="end" sx={styles.footerContainer}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() =>
              navigation.navigate("Services", {
                serviceId,
                serviceName,
                optionId: option?._id,
              })
            }
            style={disabled ? disabledStyle : styles.mainButton}
          >
            <Text style={styles.mainButtonText}>Inainte</Text>
          </TouchableOpacity>
        </Stack>
      </BottomSheetFooter>
    ),
    [disabled]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Stack align="start" sx={{ margin: 25 }}>
        <Text style={styles.mainHeading}>Filtreaza</Text>
        <Text style={styles.mainHeading}>serviciile</Text>
      </Stack>
      <BottomSheet
        handleIndicatorStyle={styles.indicatorStyle}
        ref={sheetRef}
        snapPoints={snapPoints}
        footerComponent={renderFooter}
      >
        <BottomSheetView>
          <SheetHeader
            title={`Filtru - ${filter?.name}`}
            description={option?.name}
          />
          <FlatList
            bounces={false}
            data={filter?.options}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
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
        </BottomSheetView>
      </BottomSheet>
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
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  footerContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 40,
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
  mainButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: theme.lightColors.primary,
    borderRadius: 5,
  },
  mainButtonText: {
    fontFamily: "Exo-Medium",
    color: "white",
    fontSize: 14,
  },
});
