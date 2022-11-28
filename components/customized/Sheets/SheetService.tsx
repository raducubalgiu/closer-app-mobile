import { useRef, useMemo, useCallback } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

type IProp = { children: any };

export const SheetService = ({ children }: IProp) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => [75, "60%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
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
      {children}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
