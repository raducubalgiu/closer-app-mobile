import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import * as MediaLibrary from "expo-media-library";
import { memo, useCallback, useEffect, useState } from "react";
import { Asset } from "expo-media-library";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Stack, Button } from "../../core";
import theme from "../../../../assets/styles/theme";
import MediaLibraryPhotoListItem from "../ListItems/MediaLibraryPhotoListItem";
import MediaLibraryAlbumsList from "../Lists/MediaLibraryAlbumsList";
import { LibraryAlbum } from "../../../ts/interfaces/libraryAlbum";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { showToast } from "../../../utils";

const { black } = theme.lightColors || {};
type IProps = { onClose: () => void; selectMany: boolean };

const MediaLibrarySheet = ({ onClose, selectMany }: IProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState("Recents");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [displayAlbums, setDisplayAlbums] = useState(false);
  const [albums, setAlbums] = useState<LibraryAlbum[]>([]);
  const [photos, setPhotos] = useState<Asset[]>([]);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const fetchAlbums = useCallback(async () => {
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    let projectedAlbums: LibraryAlbum[] = [];

    await Promise.all(
      fetchedAlbums.map(async (album) => {
        const { assets } = await MediaLibrary.getAssetsAsync({
          first: 1,
          album,
          mediaType: ["photo"],
        });

        if (assets[0]?.uri) {
          projectedAlbums.push({
            id: album.id,
            assetCount: album.assetCount,
            title: album.title,
            uri: assets[0]?.uri,
          });
        }
      })
    );
    setAlbums(projectedAlbums);
  }, []);

  const fetchAssets = useCallback(async () => {
    const getPhotos = await MediaLibrary.getAlbumAsync(
      selectedAlbum ? selectedAlbum : "Recents"
    );
    const { assets, endCursor, hasNextPage } =
      await MediaLibrary.getAssetsAsync({
        album: getPhotos,
        mediaType: ["photo"],
        first: 20,
        //after: endCursor,
      });
    setPhotos(assets);
  }, [selectedAlbum]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  useEffect(() => {
    if (selectedPhotos.length > 9) {
      showToast({ message: t("youCanSelectMaximumTenImages"), short: true });
    }
  }, [selectedPhotos]);

  const keyExtractor = useCallback((item: Asset) => item.id, []);

  const onSelectPhotos = useCallback(
    (action: string, uri: string) => {
      if (action === "REMOVE") {
        setSelectedPhotos((selectedPhotos) =>
          selectedPhotos.filter((photo) => photo !== uri)
        );
      } else {
        setSelectedPhotos((selectedPhotos) => selectedPhotos.concat(uri));
      }
    },
    [selectedPhotos]
  );

  const renderPhoto = useCallback(
    ({ item, index }: ListRenderItemInfo<Asset>) => (
      <MediaLibraryPhotoListItem
        index={index}
        uri={item.uri}
        onUpdateSelectedPhotos={onSelectPhotos}
        selectedPhotos={selectedPhotos}
        selectMany={selectMany}
      />
    ),
    [selectedPhotos]
  );

  const onDisplayAlbums = () => {
    setDisplayAlbums((displayAlbums) => !displayAlbums);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack direction="row">
        <Icon name="close" type="ionicon" color="white" style={styles.icon} />
        <TouchableOpacity onPress={onDisplayAlbums}>
          <Stack direction="row">
            <Text style={styles.title}>{selectedAlbum}</Text>
            <Icon
              name={
                !displayAlbums ? "keyboard-arrow-down" : "keyboard-arrow-up"
              }
            />
          </Stack>
        </TouchableOpacity>
        <Pressable style={styles.icon} onPress={onClose}>
          <Icon name="close" type="ionicon" />
        </Pressable>
      </Stack>
      {!displayAlbums ? (
        <BottomSheetFlatList
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={keyExtractor}
          numColumns={3}
        />
      ) : (
        <MediaLibraryAlbumsList
          albums={albums}
          onSelectAlbum={(album: string) => {
            setSelectedAlbum(album);
            setDisplayAlbums(false);
          }}
        />
      )}
      {selectedPhotos?.length > 0 && (
        <View style={{ alignItems: "center" }}>
          <Button
            sxBtn={{
              bottom: insets.bottom,
              ...styles.sendBtn,
            }}
            title={t("send")}
            onPress={() => {}}
          />
        </View>
      )}
    </View>
  );
};

export default memo(MediaLibrarySheet);

const styles = StyleSheet.create({
  icon: { padding: 15 },
  title: { color: black, fontWeight: "700", fontSize: 16, marginRight: 5 },
  sendBtn: {
    position: "absolute",
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
