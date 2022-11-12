import { StyleSheet, Text, SafeAreaView, Button, Image } from "react-native";
import { useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { shareAsync } from "expo-sharing";
import { CustomAvatar, IconButton, Stack } from "../components/core";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black, grey0 } = theme.lightColors;

export const CameraScreen = ({ route }) => {
  const { name, avatar } = route.params;
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [photo, setPhoto] = useState();
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
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
      </SafeAreaView>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  let flashName = "flash";

  const handleFlash = () => {
    switch (flash) {
      case "off":
        setFlash(FlashMode.on);
        flashName = "flash";
        break;
      case "on":
        setFlash(FlashMode.auto);
        flashName = "flash-auto";
        break;
      case "auto":
        setFlash(FlashMode.off);
        flashName = "flash-off";
        break;
    }
  };

  const closeCamera = () => navigation.goBack();

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
              iconName={flashName}
              iconType="ionicon"
              size={27.5}
              color="#ebebe0"
              onPress={handleFlash}
              sx={{ marginRight: 25 }}
            />
            <IconButton
              iconName="close"
              size={35}
              color="#ebebe0"
              onPress={closeCamera}
            />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ margin: 20 }}>
          <IconButton iconName="photo-library" size={35} color="#ebebe0" />
          <IconButton
            iconName="camera"
            iconType="entypo"
            onPress={takePic}
            size={32.5}
            color={black}
            sx={styles.cameraBtn}
          />
          <IconButton
            iconName="refresh-ccw"
            iconType="feather"
            size={35}
            color="#ebebe0"
            onPress={toggleCameraType}
          />
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
  preview: {
    alignSelf: "stretch",
    flex: 1,
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
    padding: 20,
    borderRadius: 50,
  },
});
