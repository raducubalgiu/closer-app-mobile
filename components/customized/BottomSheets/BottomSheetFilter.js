import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef, useMemo } from "react";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";

const BottomSheetFilter = (props) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "90%"], []);

  const goNext = () => props.onGoNext();
  const mainButtonText = props.mainButtonText;
  const footerButtons = props.footerButtons;
  let disabled = props.disabled;

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter
        {...props}
        style={{
          borderTopWidth: 1,
          borderTopColor: "#f1f1f1",
          backgroundColor: "white",
          elevation: 5,
        }}
        bottomInset={40}
        children={
          <View>
            <View style={styles.footerContainer}>
              <View style={styles.footerButtons}>{footerButtons}</View>
              <TouchableOpacity
                disabled={disabled}
                onPress={goNext}
                style={
                  disabled
                    ? { ...styles.mainButton, ...styles.disabled }
                    : styles.mainButton
                }
              >
                <Text style={styles.mainButtonText}>{mainButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    ),
    [disabled]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ margin: 25 }}>
        <Text style={styles.title}>{props.screenFirstTitle}</Text>
        <Text style={styles.title}>{props.screenSecondTitle}</Text>
      </View>
      <BottomSheet
        style={{ flex: 1 }}
        ref={sheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.indicatorStyle}
        footerComponent={renderFooter}
      >
        <View style={styles.sheetOverview}>
          <Icon
            onPress={props.onGoBack}
            name="chevron-back"
            type="ionicon"
            color={Colors.textDark}
            size={25}
          />
          <View>
            <Text style={styles.sheetFirstTitle}>{props.sheetFirstTitle}</Text>
            <Text style={styles.sheetSecondTitle}>
              {props.sheetSecondTitle}
            </Text>
          </View>
          <Icon name="chevron-back" type="ionicon" color="white" />
        </View>
        <BottomSheetView style={{ flex: 1 }}>
          {props.bottomSheetBody}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default BottomSheetFilter;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  title: {
    color: "white",
    fontFamily: "Exo-ExtraBold",
    fontSize: 28,
  },
  sheetOverview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  sheetFirstTitle: {
    fontFamily: "Exo-SemiBold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  sheetSecondTitle: {
    color: Colors.textLight,
    fontFamily: "Exo-Medium",
    marginTop: 5,
    textAlign: "center",
    marginBottom: 15,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  mainButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 5,
  },
  mainButtonText: {
    fontFamily: "Exo-Medium",
    color: "white",
    fontSize: 14,
  },
  footerButtons: { flexDirection: "row", alignItems: "center" },
  disabled: {
    backgroundColor: "#ccc",
  },
});
