import { SafeAreaView, StyleSheet, View } from "react-native";
import { useMemo, useRef, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useTranslation } from "react-i18next";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Stack, SheetModal } from "../../components/core";
import {
  CameraIconButton,
  RevertIconButton,
  PhotoLibraryButton,
  CameraReusableIconButton,
} from "../../components/customized";
import { showToast } from "../../utils";
import { Divider } from "@rneui/themed";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CameraTimerSheet from "../../components/customized/Sheets/CameraTimerSheet";
import * as Animatable from "react-native-animatable";

export const AddPhotosScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [displayButtons, setDislayButtons] = useState(true);
  const cameraRef = useRef<Camera>(null);
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [200, 400], []);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const { t } = useTranslation();

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    let photo = result.assets ? result?.assets[0] : null;

    if (photo) {
      navigation.push("AddPhotosPreview", { uri: photo.uri });
    }
  };

  let handleTakePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let photo = await cameraRef.current?.takePictureAsync(options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!photo) {
      return showToast({ message: t("somethingWentWrong") });
    }

    navigation.push("AddPhotosPreview", {
      uri: photo.uri,
    });
  };

  const handleRevertCamera = () => {
    setCameraType((type) =>
      type === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Camera
        ref={cameraRef}
        type={cameraType}
        flashMode={flash}
        style={{ flex: 1 }}
      >
        {displayButtons && (
          <Animatable.View
            animation="fadeIn"
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Stack direction="row" align="start">
              <CameraReusableIconButton
                name="close"
                type="antdesign"
                onPress={() => navigation.goBack()}
              />
              <View>
                {cameraType === CameraType.back && (
                  <CameraReusableIconButton
                    name={flash === FlashMode.off ? "flash-off" : "flash"}
                    type="ionicon"
                    onPress={() =>
                      setFlash((flash) =>
                        flash === FlashMode.off
                          ? FlashMode.torch
                          : FlashMode.off
                      )
                    }
                  />
                )}
                <CameraReusableIconButton
                  name="timer"
                  type="material-community"
                  onPress={() => {
                    sheetRef.current?.present();
                  }}
                />
                <View style={{ alignItems: "center", paddingVertical: 5 }}>
                  <Divider style={{ width: 20 }} />
                </View>
                <CameraReusableIconButton
                  name="color-filter"
                  type="ionicon"
                  onPress={() => {}}
                />
                <CameraReusableIconButton
                  name="music-note"
                  type="fontisto"
                  onPress={() => navigation.navigate("Music")}
                />
              </View>
            </Stack>
            <View style={styles.footer}>
              <Stack direction="row" sx={{ width: "100%" }} justify="around">
                <PhotoLibraryButton onPress={handlePickImage} />
                <CameraIconButton onPress={handleTakePicture} />
                <RevertIconButton onPress={handleRevertCamera} />
              </Stack>
            </View>
          </Animatable.View>
        )}
      </Camera>
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        showIndicator={false}
        enableContentPanningGesture={false}
      >
        <CameraTimerSheet
          onClose={() => {
            sheetRef.current?.close();
          }}
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
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  camera: { flex: 1 },
  footer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
