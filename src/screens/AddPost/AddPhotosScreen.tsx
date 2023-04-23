import { SafeAreaView, StyleSheet, View, Pressable } from "react-native";
import { useRef, useState } from "react";
import { Button, IconBackButton, Stack } from "../../components/core";
import { useNavigation } from "@react-navigation/native";
import { PhotoLibraryButton } from "../../components/customized/Buttons/PhotoLibraryButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { useAuth } from "../../hooks";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { Icon } from "@rneui/themed";
import { RevertIconButton } from "../../components/customized";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";

const DUMMY_PRESETS = [
  { _id: "1", name: "Normal" },
  {
    _id: "2",
    name: "Clarendon",
  },
  { _id: "3", name: "Gingam" },
  { _id: "4", name: "Werido" },
  { _id: "5", name: "Paris" },
  {
    _id: "6",
    name: "Normandia",
  },
];

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

    if (!result) {
      return showToast({ message: t("somethingWentWrong") });
    }

    navigation.push("AddPhotosPreview", { photo });
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

    navigation.push("AddPhotosPreview", { photo });
  };

  const handleRevertCamera = () => {
    setCameraType((type) =>
      type === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  // const onSubmit = async () => {
  //   const formData = new FormData();
  //   const imageJSON = {
  //     name: dayjs().format("DD-MM-YYYY:HH:mm"),
  //     uri,
  //     type: "image",
  //   } as unknown as Blob;
  //   formData.append("image", imageJSON);

  //   const options = {
  //     method: "POST",
  //     body: formData,
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://192.168.100.2:8000/api/v1/images/upload-images",
  //       options
  //     );
  //     const data = response.json();

  //     console.log("DATA!!!!", data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.camera}>
          <Camera ref={cameraRef} type={cameraType} style={{ flex: 1 }} />
          <View style={StyleSheet.absoluteFill}>
            <IconBackButton sx={{ top: 10, left: 10 }} />
          </View>
        </View>
        <View style={styles.footer}>
          <Stack direction="row" sx={{ width: "100%" }} justify="around">
            <View
              style={{
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhotoLibraryButton onPress={handlePickImage} />
            </View>
            <Pressable onPress={handleTakePicture}>
              <Icon
                name="ios-radio-button-on-outline"
                type="ionicon"
                color="white"
                size={85}
              />
            </Pressable>
            <View
              style={{
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RevertIconButton size={35} onPress={handleRevertCamera} />
            </View>
          </Stack>
        </View>
      </View>
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
  camera: {
    flex: 1,
  },
  footer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
