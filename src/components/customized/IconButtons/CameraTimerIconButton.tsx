import { StyleSheet, Pressable, View, Text } from "react-native";
import { useCallback, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import * as Animatable from "react-native-animatable";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { error } = theme.lightColors || {};
type IProps = { onPress: () => void; onComplete: () => void; duration: number };

export const CameraTimerIconButton = ({
  onPress,
  onComplete,
  duration,
}: IProps) => {
  const [displayRecordingTime, setDisplayRecordinTime] = useState(`00`);

  const onDisplayRecordingTime = useCallback(
    (s: number) => {
      const seconds = s < 10 ? `0${s}` : `${s}`;
      setDisplayRecordinTime(seconds);
    },
    [duration]
  );

  return (
    <Animatable.View animation="zoomIn" duration={750}>
      <Stack sx={{ marginBottom: 20 }}>
        <Text style={styles.recordingTime}>00:{displayRecordingTime}</Text>
      </Stack>
      <Pressable onPress={onPress}>
        <View style={styles.sequance}>
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors="#A30000"
            trailColor={"rgba(255,255,255, 0)"}
            isGrowing
            rotation="counterclockwise"
            strokeWidth={6}
            trailStrokeWidth={6}
            size={110}
            onComplete={onComplete}
            onUpdate={(remainingTime) =>
              onDisplayRecordingTime(duration - remainingTime)
            }
          >
            {() => (
              <View style={styles.circle}>
                <View style={{ ...styles.square, backgroundColor: error }} />
              </View>
            )}
          </CountdownCircleTimer>
        </View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  recordingTime: { color: "white", fontSize: 15, fontWeight: "500" },
  sequance: {
    backgroundColor: "rgba(255,255,255, 0.3)",
    borderRadius: 60,
  },
  circle: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 17.5,
    height: 17.5,
  },
});
