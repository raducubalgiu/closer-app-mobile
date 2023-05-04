import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useRef, useState } from "react";
import { Camera } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ResizeMode } from "expo-av";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CameraTimerIconButton } from "../../components/customized";
import { RootStackParams } from "../../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "CameraTimer">;

export const CameraTimerScreen = ({ route }: IProps) => {
  const { counter, sequence, cameraType } = route.params;
  const cameraRef = useRef<Camera>(null);
  const [showCounter, setShowCounter] = useState(true);
  const [showSequence, setShowSequence] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const startRecording = async () => {
    const record = await cameraRef.current?.recordAsync();
    if (record) {
      navigation.navigate("AddPhotosPreview", {
        photo: { uri: record?.uri, type: "video" },
        resizeMode: ResizeMode.CONTAIN,
      });
    }
  };

  const stopRecording = () => cameraRef.current?.stopRecording();

  const onCompleteCounter = () => {
    setShowCounter(false);
    setShowSequence(true);
    startRecording();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Camera ref={cameraRef} type={cameraType} style={styles.container}>
        <View style={styles.counter}>
          {showCounter && (
            <CountdownCircleTimer
              isPlaying
              duration={counter}
              colors="rgba(255, 255, 255, 0)"
              trailColor="rgba(255, 255, 255, 0)"
              onComplete={onCompleteCounter}
            >
              {({ remainingTime }) => (
                <Text style={styles.counterTxt}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          )}
        </View>
        <View style={{ ...styles.footer, marginBottom: insets.bottom }}>
          {showSequence && (
            <CameraTimerIconButton
              onPress={stopRecording}
              onComplete={stopRecording}
              duration={sequence}
            />
          )}
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  counter: { justifyContent: "center", alignItems: "center", flex: 1 },
  counterTxt: { color: "white", fontWeight: "700", fontSize: 125 },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
