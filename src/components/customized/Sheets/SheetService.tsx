import { useRef, useMemo, useCallback } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

type IProp = { children: any };
const { height } = Dimensions.get("window");

export const SheetService = ({ children }: IProp) => {
  const sheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  const fullHeight = height - insets.top - insets.bottom - 45;
  const snapPoints = useMemo(() => [75, fullHeight], []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.indicatorStyle}
      enableOverDrag={true}
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
