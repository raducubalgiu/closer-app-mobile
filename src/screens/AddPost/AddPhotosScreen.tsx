import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import { useRef, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { useTranslation } from "react-i18next";
import { RootStackParams } from "../../navigation/rootStackParams";
import { IconBackButton, Stack } from "../../components/core";
import {
  CameraIconButton,
  RevertIconButton,
  PhotoLibraryButton,
} from "../../components/customized";
import { showToast } from "../../utils";
import { Icon } from "@rneui/themed";

export const AddPhotosScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const cameraRef = useRef<Camera>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
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
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Stack direction="row">
          <Pressable
            style={{ padding: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" type="antdesign" size={25} color="white" />
          </Pressable>
          <View style={{ padding: 15 }}>
            <Text>Hello</Text>
          </View>
        </Stack>
        <View style={styles.footer}>
          <Stack direction="row" sx={{ width: "100%" }} justify="around">
            <PhotoLibraryButton onPress={handlePickImage} />
            <CameraIconButton onPress={handleTakePicture} />
            <RevertIconButton onPress={handleRevertCamera} />
          </Stack>
        </View>
      </Camera>
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
