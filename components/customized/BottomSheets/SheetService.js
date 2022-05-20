import { useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "@rneui/themed";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import theme from "../../../assets/styles/theme";

export const SheetService = (props) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "90%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.indicatorStyle}
      enableOverDrag={true}
      backdropComponent={renderBackdrop}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.sheetHeading}>
          {props.results} {props.results > 19 ? "de rezultate" : "rezultate"}
        </Text>
        <Divider width={2} color="#f1f1f1" style={styles.divider} />
        {props.list}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetHeading: {
    paddingVertical: 5,
    paddingLeft: 15,
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    textAlign: "center",
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  divider: { paddingBottom: 5, marginBottom: 5 },
});
