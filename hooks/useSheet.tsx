import { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

export const useSheet = (intervals: any, sheetContent: any) => {
  const bottomSheetModalRef = useRef<any>(null);
  const snapPoints = useMemo(() => [...intervals], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChange = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetModalRef.current?.close();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  );

  const bottomSheet = (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={styles.indicatorStyle}
          onDismiss={handleCloseSheet}
          onChange={handleSheetChange}
        >
          {sheetContent}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );

  return {
    SHOW_BS: handlePresentModalPress,
    CLOSE_BS: handleCloseSheet,
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
