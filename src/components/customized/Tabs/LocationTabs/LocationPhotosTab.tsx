import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  Pressable,
  ImageResizeMode,
} from "react-native";
import React, { useState } from "react";
import { Button, Stack } from "../../../core";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import dayjs from "dayjs";
import { useAuth } from "../../../../hooks";
import { showToast } from "../../../../utils";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

type IProps = { imageCover: any; locationId: string | undefined };

export const LocationPhotosTab = ({ imageCover, locationId }: IProps) => {
  const { user } = useAuth();
  const [image, setImage] = useState(imageCover);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [resizeMode, setResizeMode] = useState<ImageResizeMode>("contain");
  const portrait = 5 / 4;
  const landscape = 1 / 1.91;
  const [orientation, setOrientation] = useState(
    image?.portrait ? portrait : landscape
  );

  const formatFileName = `${dayjs()
    .utc(true)
    .format()}_${locationId}_image_cover`;

  const handleUpload = async () => {
    let formData: any = new FormData();
    formData.append("image-cover", {
      name: formatFileName,
      uri: image?.url,
      type: "image/jpg",
    } as unknown as Blob);

    formData.append("orientation", orientation);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.BASE_ENDPOINT}/locations/${locationId}/image-cover`,
        {
          method: "PATCH",
          body: formData,
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      const data = await response.json();
      setLoading(false);
      setImage(data.imageCover.url);
      showToast({ message: "Ai editat cu success imaginea de fundal" });
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    let photo = result.assets ? result?.assets[0] : null;
    setImage({ url: photo?.uri });
  };

  const handleCrop = async () => {
    const manipResult = await manipulateAsync(
      image.url,
      [{ crop: { width, height: 1350, originX: 1, originY: 1 } }],
      { compress: 0.8, base64: true }
    );
    console.log("WIDTH", manipResult.width);
    console.log("HEIGHT", manipResult.height);
    setImage({ url: manipResult.uri });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width,
            height: width * portrait,
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width,
              height: width * portrait,
            }}
          >
            <View
              style={{
                width: width,
                height: width * orientation,
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Pressable
                onPress={handlePickImage}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  flex: 1,
                }}
              >
                <Image
                  source={{ uri: image?.url }}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    flex: 1,
                    resizeMode,
                  }}
                />
              </Pressable>
            </View>
          </View>
          <Stack
            direction="row"
            justify="center"
            align="center"
            sx={{ marginTop: 15 }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                width: 60,
                height: 35,
                borderRadius: 2.5,
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Icon name="eye" type="feather" />
            </Pressable>
            <Pressable
              onPress={() => {
                setOrientation(portrait);
                setResizeMode("contain");
              }}
              style={{
                width: 60,
                height: 35,
                borderRadius: 2.5,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: orientation === portrait ? "#ddd" : "white",
                borderColor: orientation === portrait ? "#ccc" : "#ddd",
              }}
            >
              <Icon name="crop-portrait" type="material-community" />
            </Pressable>
            <Pressable
              onPress={() => {
                setOrientation(landscape);
                setResizeMode("contain");
              }}
              style={{
                width: 60,
                height: 35,
                borderRadius: 2.5,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10,
                backgroundColor: orientation === landscape ? "#ddd" : "white",
                borderColor: orientation === landscape ? "#ccc" : "#ddd",
              }}
            >
              <Icon name="crop-landscape" type="material-community" />
            </Pressable>
            <Pressable
              onPress={() =>
                setResizeMode((resizeMode) =>
                  resizeMode === "contain" ? "cover" : "contain"
                )
              }
              style={{
                width: 60,
                height: 35,
                borderRadius: 2.5,
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="arrow-expand" type="material-community" />
            </Pressable>
          </Stack>
        </View>
      </ScrollView>
      <View style={{ marginBottom: insets.bottom, marginHorizontal: 15 }}>
        <Button
          title={t("save")}
          disabled={imageCover?.url === image?.url}
          onPress={handleCrop}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  resizeBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
