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
};

const SheetModal = forwardRef(
  (
    { children, snapPoints, animationConfig = defAnimation }: IProps,
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
          >
            {children}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    );
  }
);

export default memo(SheetModal);

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
