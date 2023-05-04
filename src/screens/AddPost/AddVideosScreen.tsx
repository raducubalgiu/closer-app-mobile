import { SafeAreaView, StyleSheet, View, Pressable } from "react-native";
import { useRef, useState, useMemo } from "react";
import { Icon, Divider } from "@rneui/themed";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Stack, SheetModal } from "../../components/core";
import {
  PhotoLibraryButton,
  CameraIconButton,
  RevertIconButton,
  CameraReusableIconButton,
} from "../../components/customized";
import CameraTimerSheet from "../../components/customized/Sheets/CameraTimerSheet";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export const AddVideosScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef<Camera>(null);
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [200, 400], []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    let photo = result.assets ? result?.assets[0] : null;

    if (photo) {
      navigation.push("AddPhotosPreview", { photo, resizeMode: "contain" });
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

    navigation.push("AddPhotosPreview", { photo, resizeMode: "cover" });
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
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Stack direction="row" align="start">
          <Pressable
            style={{ padding: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" type="antdesign" size={25} color="white" />
          </Pressable>
          <View>
            {cameraType === CameraType.back && (
              <CameraReusableIconButton
                name={flash === FlashMode.off ? "flash-off" : "flash"}
                type="ionicon"
                onPress={() =>
                  setFlash((flash) =>
                    flash === FlashMode.off ? FlashMode.torch : FlashMode.off
                  )
                }
              />
            )}
            <CameraReusableIconButton
              name="timer"
              type="material-community"
              onPress={() => sheetRef.current?.present()}
            />
            <View style={{ alignItems: "center", paddingVertical: 5 }}>
              <Divider style={{ width: 20 }} />
            </View>
            <Pressable style={{ padding: 15 }} onPress={() => {}}>
              <Icon
                name="color-filter"
                type="ionicon"
                size={27.5}
                color="white"
              />
            </Pressable>
            <Pressable style={{ padding: 15 }} onPress={() => {}}>
              <Icon
                name="music-note"
                type="fontisto"
                size={27.5}
                color="white"
              />
            </Pressable>
          </View>
        </Stack>
        <View style={styles.footer}>
          <Stack direction="row" sx={{ width: "100%" }} justify="around">
            <PhotoLibraryButton onPress={handlePickImage} />
            <CameraIconButton onPress={handleTakePicture} type="video" />
            <RevertIconButton onPress={handleRevertCamera} />
          </Stack>
        </View>
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
  footer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
