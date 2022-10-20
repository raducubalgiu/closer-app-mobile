import { useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "@rneui/themed";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import theme from "../../../assets/styles/theme";
import { Spinner } from "../../core";

const { black } = theme.lightColors;

export const SheetService = ({ results, list, loading, ...props }) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => [80, "60%", "90%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
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
      index={1}
    >
      <View style={{ flex: 1 }}>
        <View style={{ height: 50 }}>
          <Text style={styles.sheetHeading}>
            {results} {results > 19 ? "de rezultate" : "rezultate"}
          </Text>
        </View>
        <Divider width={2} color="#f1f1f1" style={styles.divider} />
        {!loading && list}
        {loading && <Spinner />}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetHeading: {
    color: black,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  divider: { paddingBottom: 5, marginBottom: 5 },
});
