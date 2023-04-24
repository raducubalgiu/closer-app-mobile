import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { useRef, useState } from "react";
import { Icon } from "@rneui/themed";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as Haptics from "expo-haptics";
import { Stack } from "../../../../components/core";
import {
  CameraIconButton,
  CloseIconButton,
  RevertIconButton,
  FlashIconButton,
} from "../../../../components/customized";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

const { width } = Dimensions.get("window");

export const EditAvatarCameraScreen = () => {
  const [type, setType] = useState(CameraType.front);
  const [flash, setFlash] = useState(FlashMode.auto);
  const [zoom, setZoom] = useState(0);
  const ref = useRef<Camera>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  let handleTakePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let photo = await ref.current?.takePictureAsync(options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (photo) {
      navigation.navigate("EditAvatar", { photo });
    }
  };

  const handleRevertCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleFlashMode = () => {
    switch (flash) {
      case FlashMode.auto:
        setFlash(FlashMode.on);
        break;
      case FlashMode.on:
        setFlash(FlashMode.off);
        break;
      case FlashMode.off:
        setFlash(FlashMode.auto);
        break;
      default:
        setFlash(FlashMode.auto);
    }
  };

  const handleZoom = () => setZoom((zoom) => (zoom === 0 ? 0.02 : 0));

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Camera
          ref={ref}
          type={type}
          flashMode={flash}
          zoom={zoom}
          style={styles.camera}
        />
        <View style={styles.zoom}>
          <Pressable style={styles.btn} onPress={handleZoom}>
            <Icon name="arrowsalt" type="antdesign" color="white" size={20} />
          </Pressable>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Stack direction="row" justify="around">
            <FlashIconButton flash={flash} onFlash={handleFlashMode} />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.photo}>FOTO</Text>
              <CameraIconButton onPress={handleTakePicture} />
            </View>
            <RevertIconButton onPress={handleRevertCamera} />
          </Stack>
        </View>
        <View style={styles.header}>
          <CloseIconButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "black",
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  header: {
    position: "absolute",
    alignItems: "flex-start",
    padding: 20,
  },
  zoom: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  camera: { width, height: width * 1.25 },
  btn: {
    padding: 10,
    backgroundColor: "rgba(64, 64, 64, 0.6)",
    borderRadius: 50,
  },
  photo: { color: "#FCD12A", fontWeight: "500", marginBottom: 5 },
});
