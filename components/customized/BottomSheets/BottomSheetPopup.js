import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

const BottomSheetPopup = (props) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", `${props.height}`], []);

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

  const handleSheetChange = useCallback((index) => {
    if (index === 0) {
      bottomSheetModalRef.current?.snapToIndex(1);
    }
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (props.open) {
      handlePresentModalPress();
    }
  }, [props.open]);

  const dismissHandler = () => {
    bottomSheetModalRef.current.close();
    props.onClose();
  };

  return (
    <Portal>
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            onChange={handleSheetChange}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={styles.indicatorStyle}
            onDismiss={dismissHandler}
          >
            <View style={styles.container}>{props.sheetBody}</View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});

export default BottomSheetPopup;
