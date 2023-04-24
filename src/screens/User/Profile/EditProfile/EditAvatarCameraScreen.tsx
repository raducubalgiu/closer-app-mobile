import {
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useRef, useState } from "react";
import { Icon } from "@rneui/themed";
import { Camera, CameraType } from "expo-camera";
import * as Haptics from "expo-haptics";
import { Stack } from "../../../../components/core";
import { CloseIconButton } from "../../../../components/customized";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const EditAvatarCameraScreen = () => {
  const { width } = useWindowDimensions();
  const [type, setType] = useState(CameraType.front);
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Camera ref={ref} type={type} style={{ width, height: width * 1.25 }} />
        <Stack direction="row" justify="around" sx={{ flex: 1 }}>
          <Pressable
            style={{
              padding: 12.5,
              backgroundColor: "rgba(64, 64, 64, 0.5)",
              borderRadius: 50,
            }}
          >
            <Icon name="flash" type="ionicon" color="white" size={20} />
          </Pressable>
          <Pressable onPress={handleTakePicture}>
            <Icon
              name="ios-radio-button-on-outline"
              type="ionicon"
              color="white"
              size={85}
            />
          </Pressable>
          <Pressable
            onPress={handleRevertCamera}
            style={{
              padding: 12.5,
              backgroundColor: "rgba(64, 64, 64, 0.5)",
              borderRadius: 50,
            }}
          >
            <Icon name="refresh-ccw" type="feather" color="white" size={22.5} />
          </Pressable>
        </Stack>
        <View
          style={{
            position: "absolute",
            alignItems: "flex-start",
            padding: 20,
          }}
        >
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
  cameraBtn: {
    backgroundColor: "white",
    padding: 17.5,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
