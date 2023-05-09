import { StyleSheet } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import { Portal } from "@gorhom/portal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetModalProps,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";

type IProps = BottomSheetModalProps & {
  children: React.ReactNode;
  showIndicator?: boolean;
  duration?: number;
};

const SheetModal = forwardRef(
  (
    { children, showIndicator = true, duration = 150, ...props }: IProps,
    ref: any
  ) => {
    const animationConfigs = useBottomSheetTimingConfigs({ duration });

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
            {...props}
            ref={ref}
            index={1}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={styles.indicatorStyle}
            onChange={handleSheetChange}
            handleStyle={{ padding: showIndicator ? 10 : 0 }}
            animationConfigs={animationConfigs}
          >
            {children}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    );
  }
);

export default memo(SheetModal);
