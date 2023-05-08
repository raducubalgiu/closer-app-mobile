import { SafeAreaView, StyleSheet, View, Pressable, Text } from "react-native";
import { useRef, useState, useMemo, useCallback } from "react";
import { Divider } from "@rneui/themed";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, SheetModal } from "../../components/core";
import {
  PhotoLibraryButton,
  CameraIconButton,
  RevertIconButton,
  CameraReusableIconButton,
  CameraTimerIconButton,
  CameraTimerSheet,
} from "../../components/customized";
import { RootStackParams } from "../../navigation/rootStackParams";

export const AddVideosScreen = () => {
  const [displayButtons, setDisplayButtons] = useState(true);
  const [showCounter, setShowCounter] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoSize, setVideoSize] = useState(15);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef<Camera>(null);
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [200, 400], []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();

  const handlePickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    let video = result.assets ? result?.assets[0] : null;

    if (video?.uri) {
      navigation.push("AddVideosPreview", { uri: video.uri });
    }
  };

  let handleStartRecording = useCallback(async () => {
    setDisplayButtons((displayButtons) => !displayButtons);
    setRecording(true);

    const record = await cameraRef.current?.recordAsync();
    if (record) {
      navigation.navigate("AddVideosPreview", {
        uri: record.uri,
      });
    }
  }, [displayButtons]);

  const handleStopRecording = () => cameraRef.current?.stopRecording();

  const handleRevertCamera = useCallback(() => {
    setCameraType((type) =>
      type === CameraType.back ? CameraType.front : CameraType.back
    );
  }, [CameraType]);

  const onFlash = useCallback(
    () =>
      setFlash((flash) =>
        flash === FlashMode.off ? FlashMode.torch : FlashMode.off
      ),
    [FlashMode]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Camera
        ref={cameraRef}
        type={cameraType}
        flashMode={flash}
        style={{ flex: 1 }}
      >
        {displayButtons && (
          <Animatable.View animation="fadeIn" style={styles.content}>
            <Stack direction="row" align="start">
              <CameraReusableIconButton
                name="close"
                type="antdesign"
                onPress={() => navigation.goBack()}
                size={25}
              />
              <Stack>
                {cameraType === CameraType.back && (
                  <CameraReusableIconButton
                    name={flash === FlashMode.off ? "flash-off" : "flash"}
                    type="ionicon"
                    onPress={onFlash}
                  />
                )}
                <CameraReusableIconButton
                  name="timer"
                  type="material-community"
                  onPress={() => sheetRef.current?.present()}
                />
                <Divider style={{ width: 20, marginVertical: 7.5 }} />
                <CameraReusableIconButton
                  name="emoji-emotions"
                  onPress={() => {}}
                />
                <CameraReusableIconButton
                  name="color-filter"
                  type="ionicon"
                  onPress={() => {}}
                />
                <CameraReusableIconButton
                  name="music-note"
                  type="fontisto"
                  onPress={() => {}}
                />
              </Stack>
            </Stack>
            <View style={[styles.footer, { marginBottom: insets.bottom }]}>
              <Stack direction="row" sx={{ marginBottom: 30 }}>
                {[15, 30, 60].map((sec, i) => (
                  <Pressable key={i} onPress={() => setVideoSize(sec)}>
                    <Animatable.View
                      style={{
                        backgroundColor:
                          sec === videoSize ? "white" : "transparent",
                        paddingVertical: 5,
                        paddingHorizontal: 30,

                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: sec === videoSize ? "black" : "white",
                          fontWeight: "600",
                        }}
                      >
                        {sec}s
                      </Text>
                    </Animatable.View>
                  </Pressable>
                ))}
              </Stack>
              <Stack direction="row" sx={{ width: "100%" }} justify="around">
                <PhotoLibraryButton onPress={handlePickVideo} />
                {!recording && (
                  <CameraIconButton
                    onPress={handleStartRecording}
                    type="video"
                  />
                )}
                <RevertIconButton onPress={handleRevertCamera} />
              </Stack>
            </View>
          </Animatable.View>
        )}
        {recording && (
          <Animatable.View
            animation="fadeIn"
            style={{
              bottom: insets.bottom,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CameraTimerIconButton
              duration={videoSize}
              onPress={() => {
                setRecording(false);
                setDisplayButtons(true);
                handleStopRecording();
              }}
              onComplete={() => {
                setRecording(false);
                setDisplayButtons(true);
                handleStopRecording();
              }}
            />
          </Animatable.View>
        )}
      </Camera>
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
        showIndicator={false}
        enableContentPanningGesture={false}
      >
        <CameraTimerSheet
          onClose={() => sheetRef.current?.close()}
          cameraType={cameraType}
        />
      </SheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
