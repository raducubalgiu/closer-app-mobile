import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { AlbumListItem } from "../ListItems/AlbumListItem";
import * as MediaLibrary from "expo-media-library";

export const LibraryAlbumsList = ({ onAssets }) => {
  const [albums, setAlbums] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchAlbums = async () => {
        const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: true,
        });

        let projectedAlbums = [];

        await Promise.all(
          fetchedAlbums.map(async (el) => {
            const { assets } = await MediaLibrary.getAssetsAsync({
              first: 1,
              album: el,
              mediaType: ["photo"],
            });

            if (assets[0]?.uri) {
              projectedAlbums.push({
                id: el.id,
                assetCount: el.assetCount,
                title: el.title,
                uri: assets[0]?.uri,
              });
            }
          })
        );
        setAlbums(projectedAlbums);
      };

      fetchAlbums();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const renderAlbum = useCallback(({ item }) => {
    return (
      <AlbumListItem
        onPress={() => onAssets(item.title)}
        uri={item.uri}
        title={item.title}
        assetCount={item.assetCount}
      />
    );
  }, []);

  return (
    <FlashList
      data={albums}
      keyExtractor={(item) => item.id}
      renderItem={renderAlbum}
      estimatedItemSize={100}
    />
  );
};
