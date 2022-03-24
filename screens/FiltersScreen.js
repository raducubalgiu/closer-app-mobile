import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { Colors } from "../assets/styles/Colors";
import { Divider, Icon } from "react-native-elements";

const FiltersScreen = ({ route }) => {
  const { serviceId, serviceName } = route.params;
  const [calendar, setCalendar] = useState(true);
  const navigation = useNavigation();
  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 7.5,
                  paddingHorizontal: 12.5,
                  borderWidth: 2,
                  borderColor: Colors.primary,
                  marginTop: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: Colors.textDark, fontFamily: "Exo-Medium" }}
                >
                  Orice ora
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 7.5,
                  paddingHorizontal: 12.5,
                  marginLeft: 5,
                  borderWidth: 2,
                  borderColor: "#ccc",
                  marginTop: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: Colors.textDark, fontFamily: "Exo-Medium" }}
                >
                  Alege ora
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Services", {
                  serviceId: serviceId,
                  serviceName: serviceName,
                })
              }
              style={{
                paddingVertical: 12.5,
                paddingHorizontal: 15,
                backgroundColor: Colors.primary,
                marginTop: 20,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Exo-Medium",
                  color: "white",
                  fontSize: 14,
                }}
              >
                Inainte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ margin: 25 }}>
        <Text
          style={{ color: "white", fontFamily: "Exo-ExtraBold", fontSize: 28 }}
        >
          Selecteaza
        </Text>
        <Text
          style={{ color: "white", fontFamily: "Exo-ExtraBold", fontSize: 28 }}
        >
          perioada
        </Text>
      </View>
      <BottomSheet
        style={styles.bottomSheet}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        handleIndicatorStyle={styles.indicatorStyle}
        footerComponent={renderFooter}
      >
        <BottomSheetView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Icon
              onPress={() => navigation.goBack()}
              name="chevron-back"
              type="ionicon"
              color={Colors.textDark}
              size={20}
            />
            <View>
              <Text
                style={{
                  fontFamily: "Exo-SemiBold",
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 16,
                }}
              >
                {serviceName}
              </Text>
              <Text
                style={{
                  color: Colors.textLight,
                  fontFamily: "Exo-Medium",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                {/* 24 - 31 mar (14:30 - 15:00) */}
                {calendar ? "Acum - 23 mar" : "Oricand dupa ora 18"}
              </Text>
            </View>
            <Icon name="chevron-back" type="ionicon" color="white" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f1f1f1",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setCalendar((calendar) => !calendar)}
                style={
                  calendar
                    ? {
                        paddingVertical: 7.5,
                        paddingHorizontal: 15,
                        backgroundColor: "white",
                        borderRadius: 20,
                      }
                    : {
                        paddingVertical: 7.5,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                      }
                }
              >
                <Text
                  style={{
                    fontFamily: "Exo-Medium",
                    color: Colors.textDark,
                    fontSize: 13.5,
                  }}
                >
                  Calendar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCalendar((calendar) => !calendar)}
                style={
                  !calendar
                    ? {
                        paddingVertical: 7.5,
                        paddingHorizontal: 15,
                        marginLeft: 5,
                        borderRadius: 20,
                        backgroundColor: "white",
                      }
                    : {
                        paddingVertical: 7.5,
                        paddingHorizontal: 15,
                        marginLeft: 5,
                        borderRadius: 20,
                      }
                }
              >
                <Text
                  style={{
                    fontFamily: "Exo-Medium",
                    color: Colors.textDark,
                    fontSize: 13.5,
                  }}
                >
                  Oricand dupa 18:00
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!calendar && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Icon
                name="emoticon-cool-outline"
                type="material-community"
                style={{
                  padding: 50,
                  backgroundColor: "#f1f1f1",
                  borderRadius: 100,
                }}
                size={50}
                color={Colors.primary}
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  filters: {
    flex: 1,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 0,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontFamily: "Exo-Medium",
  },
  bottomSheet: {
    // shadowColor: "#c9c5c5",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 10,
    // elevation: 11,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
