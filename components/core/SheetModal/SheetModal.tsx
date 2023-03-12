import { StyleSheet } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import { Portal } from "@gorhom/portal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

const defAnimation = { duration: 400 };

type IProps = {
  children: any;
  snapPoints: any;
  animationConfig?: any;
  showIndicator?: boolean;
  enableContentPanningGesture?: boolean;
};

const SheetModal = forwardRef(
  (
    {
      children,
      snapPoints,
      enableContentPanningGesture = true,
      showIndicator = true,
      animationConfig = defAnimation,
    }: IProps,
    ref: any
  ) => {
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

    const handleSheetChange = useCallback((index: number) => {
      if (index === 0) {
        ref.current?.close();
      }
    }, []);

    const styles = StyleSheet.create({
      indicatorStyle: {
        display: showIndicator ? "flex" : "none",
        backgroundColor: "#ddd",
        width: 45,
        height: 5,
      },
    });

    return (
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={styles.indicatorStyle}
            onChange={handleSheetChange}
            animationConfigs={animationConfig}
            enableContentPanningGesture={enableContentPanningGesture}
            handleStyle={{ padding: showIndicator ? 10 : 0 }}
          >
            {children}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    );
  }
);

export default memo(SheetModal);
