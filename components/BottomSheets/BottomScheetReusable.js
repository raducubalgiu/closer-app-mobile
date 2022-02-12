import { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

const BottomScheetReusable = (props) => {
  const sheetRef = useRef(null);
  const [sheetStep, setSheetStep] = useState(0);

  const snapPoints = useMemo(() => ["40%", "95%"], []);

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
      style={{
        shadowColor: "#c9c5c5",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,

        elevation: 11,
      }}
      
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose={true}
    >
      <BottomSheetView>
        <View style={styles.screen}>{props.children}</View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomScheetReusable;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
