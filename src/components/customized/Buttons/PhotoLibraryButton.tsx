import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { isEmpty } from "lodash";

type IProps = { onPress: () => void; size?: number };

export const PhotoLibraryButton = ({ onPress, size = 40 }: IProps) => {
  const [uri, setUri] = useState("");

  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "white",
    },
  });

  const fetchPhotos = useCallback(async () => {
    const getPhotos = await MediaLibrary.getAlbumAsync("Recents");
    const { assets } = await MediaLibrary.getAssetsAsync({
      album: getPhotos,
      mediaType: ["photo"],
      first: 1,
    });

    setUri(assets[0]?.uri);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Pressable onPress={onPress}>
      {!isEmpty(uri) && <Image source={{ uri }} style={styles.image} />}
    </Pressable>
  );
};
