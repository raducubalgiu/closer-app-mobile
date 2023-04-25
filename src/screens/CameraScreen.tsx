import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { IconButton, Stack } from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import theme from "../../assets/styles/theme";
import {
  CameraIconButton,
  CloseIconButton,
  RevertIconButton,
  PhotoLibraryButton,
} from "../components/customized";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Camera">;

export const CameraScreen = ({ route }: IProps) => {
  const { name, avatar } = route.params;
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.auto);
  const [openFlash, setOpenFlash] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  let handleTakePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let photo = await cameraRef.current?.takePictureAsync(options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (photo) {
      navigation.navigate("CameraPreview", {
        photo,
        avatar,
        name,
      });
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    let photo = result.assets ? result?.assets[0] : null;

    if (photo) {
      navigation.push("CameraPreview", { photo, avatar, name });
    }
  };

  const handleRevertCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const handleCloseCamera = () => navigation.goBack();

  const flashes = [
    { name: "Auto", mode: FlashMode.auto },
    { name: t("yes"), mode: FlashMode.on },
    { name: t("no"), mode: FlashMode.off },
  ];

  const onFlash = (mode: FlashMode) => {
    setFlash(mode);
    setOpenFlash(false);
  };

  const renderFlash = (f: { name: string; mode: FlashMode }, i: number) => (
    <Pressable
      onPress={() => onFlash(f.mode)}
      key={i}
      style={styles.flashOptions}
    >
      <Text
        style={{
          color: f.mode === flash ? "#FCD12A" : "white",
          ...styles.flashOptionTxt,
        }}
      >
        {f.name}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Camera ref={cameraRef} type={type} style={styles.container}>
        <View style={{ margin: 15 }}>
          <Stack direction="row">
            <Stack direction="row" sx={styles.user}>
              <CustomAvatar avatar={avatar} size={30} />
              <Stack align="start" sx={{ marginLeft: 10 }}>
                <Text style={styles.to}>{t("to")}</Text>
                <Text style={styles.name}>{name}</Text>
              </Stack>
            </Stack>
            <Stack direction="row">
              <IconButton
                name={flash === FlashMode.off ? "flash-off" : "flash"}
                type="ionicon"
                size={25}
                color="white"
                onPress={() => setOpenFlash((openFlash) => !openFlash)}
                sx={styles.flash}
              />
              <CloseIconButton onPress={handleCloseCamera} />
            </Stack>
          </Stack>
          {openFlash && (
            <Animatable.View animation="fadeInLeft" duration={150}>
              <Stack
                direction="row"
                align="center"
                justify="center"
                sx={{ marginTop: 30 }}
              >
                {flashes.map((f, i) => renderFlash(f, i))}
              </Stack>
            </Animatable.View>
          )}
        </View>
        <Stack direction="row" sx={{ margin: 20 }}>
          <PhotoLibraryButton onPress={handlePickImage} />
          <CameraIconButton onPress={handleTakePicture} />
          <RevertIconButton onPress={handleRevertCamera} />
        </Stack>
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
  },
  user: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 7.5,
    paddingRight: 12.5,
    borderRadius: 25,
  },
  to: { color: grey0, fontSize: 12 },
  name: { color: black, fontWeight: "500", fontSize: 13.5 },
  flash: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginRight: 25,
  },
  flashOptions: { paddingVertical: 15, paddingHorizontal: 20 },
  flashOptionTxt: {
    fontSize: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
