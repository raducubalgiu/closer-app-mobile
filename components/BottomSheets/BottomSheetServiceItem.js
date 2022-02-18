import { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Dimensions } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Tabs from "../Tabs/Tabs";

const BottomSheetRecommend = (props) => {
  const sheetRef = useRef(null);
  const [sheetStep, setSheetStep] = useState(0);
  const height = Dimensions.get("window").height;

  const snapPoints = useMemo(() => [height / 1.54, "95%"], []);

  const handleSheetChange = useCallback((index) => {
    setSheetStep(index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={sheetStep[0]}
        appearsOnIndex={sheetStep[1]}
      />
    ),
    []
  );

  return (
    <BottomSheet
      style={styles.bottomSheet}
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleIndicatorStyle={styles.indicatorStyle}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <Tabs />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetRecommend;

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
