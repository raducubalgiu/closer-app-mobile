import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";

export const useSheetView = (intervals, sheetContent, footerContent) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => [...intervals], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props}>{footerContent}</BottomSheetFooter>
    ),
    []
  );

  const bottomSheet = (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.indicatorStyle}
      footerComponent={renderFooter}
    >
      <BottomSheetView>{sheetContent}</BottomSheetView>
    </BottomSheet>
  );

  return {
    BOTTOM_SHEET: bottomSheet,
  };
};

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
