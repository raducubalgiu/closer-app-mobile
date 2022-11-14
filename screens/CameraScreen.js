import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CustomAvatar, IconButton, Stack } from "../components/core";
import theme from "../assets/styles/theme";
import {
  CameraPreview,
  CloseIconButton,
  PhotoIconButton,
  RevertIconButton,
  PhotoLibraryButton,
} from "../components/customized";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from "expo-haptics";

const { black, grey0 } = theme.lightColors;

export const CameraScreen = ({ route }) => {
  const { uri } = route.params;
  const { name, avatar } = route.params;
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [photo, setPhoto] = useState(null);
  let cameraRef = useRef();
  const navigation = useNavigation();
  const { t } = useTranslation();

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPhoto(newPhoto);
  };

  if (photo) {
    const handleClosePreview = () => setPhoto(null);

    const handleDownload = () =>
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(null);
      });

    const handleSendPhoto = () => {};

    return (
      <CameraPreview
        uri={"data:image/jpg;base64," + photo.base64}
        avatar={avatar}
        onClosePreview={handleClosePreview}
        onDownload={handleDownload}
        onSendPhoto={handleSendPhoto}
      />
    );
  }

  if (uri) {
    return <CameraPreview uri={uri} avatar={avatar} />;
  }

  const handleRevertCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const handleCloseCamera = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.screen}>
      <Camera
        ref={cameraRef}
        type={type}
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <Stack direction="row" sx={{ margin: 20 }}>
          <Stack direction="row" sx={styles.user}>
            <CustomAvatar avatar={avatar} size={30} iconSize="15" />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.to}>{t("to")}</Text>
              <Text style={styles.name}>{name}</Text>
            </Stack>
          </Stack>
          <Stack direction="row">
            <IconButton
              iconName="flash"
              iconType="ionicon"
              size={25}
              color="#ebebe0"
              onPress={() => {}}
              sx={{ marginRight: 25 }}
            />
            <CloseIconButton onPress={handleCloseCamera} />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ margin: 20 }}>
          <PhotoLibraryButton
            uri="https://res.cloudinary.com/closer-app/image/upload/v1667549749/marina-filimon-avatar_n6aiua.jpg"
            onPress={() =>
              navigation.navigate("PhotoLibrary", { nav: "Camera" })
            }
          />
          {/* <PhotoIconButton
            size={35}
            onPress={() => navigation.navigate("PhotoLibrary")}
          /> */}
          <IconButton
            iconName="camera"
            iconType="entypo"
            onPress={takePic}
            size={32.5}
            color={black}
            sx={styles.cameraBtn}
          />
          <RevertIconButton size={35} onPress={handleRevertCamera} />
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
    backgroundColor: "#ebebe0",
    padding: 7.5,
    paddingRight: 12.5,
    borderRadius: 25,
    opacity: 0.85,
  },
  to: { color: grey0, fontSize: 12 },
  name: { color: black, fontWeight: "500", fontSize: 13.5 },
  cameraBtn: {
    backgroundColor: "#ebebe0",
    padding: 17.5,
    borderRadius: 50,
  },
});
