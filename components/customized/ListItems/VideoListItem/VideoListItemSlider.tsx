import { Slider } from "@rneui/themed";
import { memo } from "react";

type IProps = {
  width: number;
  onSlidingStart: () => void;
  onSlidingComplete: (value: number) => Promise<void>;
  onValueChange: (value: any) => void;
  value: number;
  maximumValue?: number;
};

const VideoListItemSlider = ({
  width,
  onSlidingStart,
  onSlidingComplete,
  value = 0,
  maximumValue,
  onValueChange,
}: IProps) => {
  return (
    <Slider
      allowTouchTrack={false}
      onValueChange={onValueChange}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
      value={value}
      minimumValue={0}
      maximumValue={maximumValue}
      trackStyle={{
        height: 2.5,
        width,
      }}
      thumbStyle={{
        height: 10,
        width: 10,
        backgroundColor: "white",
      }}
      thumbTouchSize={{ width: 50, height: 50 }}
      maximumTrackTintColor="#4d4d4d"
      minimumTrackTintColor="#999999"
      containerStyle={{
        containerHorizontal: {
          justifyContent: "center",
          height: 2.5,
        },
        containerVertical: {
          width,
          flexDirection: "column",
          alignItems: "center",
        },
        track: {
          borderRadius: 0,
        },
        trackHorizontal: {
          height: 2.5,
        },
        trackVertical: { flex: 1, width },
        touchArea: {
          position: "absolute",
          backgroundColor: "red",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        debugThumbTouchArea: {
          position: "absolute",
          backgroundColor: "red",
          opacity: 1,
        },
      }}
      style={{ marginBottom: 10 }}
    />
  );
};

export default memo(VideoListItemSlider);
