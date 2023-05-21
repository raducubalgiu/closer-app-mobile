import { StyleSheet, Text, ViewStyle } from "react-native";
import { memo } from "react";
import { RangeSlider } from "@sharcoux/slider";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { grey0, primary } = theme.lightColors || {};
type IProps = {
  range: [number, number];
  min: number;
  max: number;
  onValueChange: (range: [number, number]) => void;
  sx?: ViewStyle;
  sxHeader?: ViewStyle;
  sxLabel?: ViewStyle;
  withHeader?: boolean;
  label?: string;
};

const THUMB_SIZE = 12.5;

const CustomRangeSlider = ({
  range,
  min,
  max,
  onValueChange,
  sx,
  sxHeader,
  sxLabel,
  withHeader = true,
  label,
  ...props
}: IProps) => {
  return (
    <>
      <Stack direction="row" sx={{ ...styles.header, ...sxHeader }}>
        <Text style={styles.labelStyle}>
          {range[0].toLocaleString("en-EN")} {label}
        </Text>
        <Text style={[styles.labelStyle, sxLabel]}>
          {range[1].toLocaleString("en-EN")} {label}
        </Text>
      </Stack>
      <RangeSlider
        range={range}
        minimumValue={min}
        maximumValue={max}
        step={1}
        crossingAllowed={false}
        outboundColor="#E4E4E4"
        inboundColor={primary}
        thumbTintColor={primary}
        thumbStyle={styles.thumbStyle}
        trackHeight={5}
        thumbSize={15}
        thumbImage={undefined}
        slideOnTap={true}
        onValueChange={onValueChange}
        style={sx}
        {...props}
      />
    </>
  );
};

export default memo(CustomRangeSlider);

const styles = StyleSheet.create({
  header: { marginHorizontal: 5, marginTop: 30, marginBottom: 10 },
  thumbStyle: {
    width: THUMB_SIZE * 2,
    height: THUMB_SIZE * 2,
    borderRadius: THUMB_SIZE,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },
  labelStyle: { color: grey0, textTransform: "lowercase" },
});
