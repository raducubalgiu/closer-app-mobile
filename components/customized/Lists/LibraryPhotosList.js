import { FlashList } from "@shopify/flash-list";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { CardPostImage } from "../Cards/CardPostImage";

export const LibraryPhotosList = ({ album }) => {
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPhotos = async () => {
        const getPhotos = await MediaLibrary.getAlbumAsync(album);
        const { assets, endCursor, hasNextPage } =
          await MediaLibrary.getAssetsAsync({
            album: getPhotos,
            mediaType: ["photo"],
            first: 50,
            after: endCursor,
          });
        setPhotos(assets);
      };

      fetchPhotos();

      return () => {
        isActive = false;
      };
    }, [album])
  );

  const renderPhoto = useCallback(({ item, index }) => {
    return (
      <CardPostImage
        index={index}
        image={item.uri}
        col={4}
        onPress={() => navigation.navigate("EditAvatar", { uri: item.uri })}
      />
    );
  }, []);

  return (
    <FlashList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={4}
      renderItem={renderPhoto}
      estimatedItemSize={95}
    />
  );
};
