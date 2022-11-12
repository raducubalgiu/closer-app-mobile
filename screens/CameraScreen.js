import { StyleSheet, Text, SafeAreaView } from "react-native";
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
} from "../components/customized";

const { black, grey0 } = theme.lightColors;

export const CameraScreen = ({ route }) => {
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
    setPhoto(newPhoto);
  };

  if (photo) {
    const handleClosePreview = () => setPhoto(null);
    const handleDownload = () => {};
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

  const handleRevertCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const handleCloseCamera = () => navigation.goBack();

  return (
    <Camera style={styles.screen} ref={cameraRef} type={type}>
      <SafeAreaView style={styles.container}>
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
          <PhotoIconButton size={35} onPress={() => {}} />
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
      </SafeAreaView>
    </Camera>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
