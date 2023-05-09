import {
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  FlatList,
  ListRenderItemInfo,
  Text,
} from "react-native";
import { Image, Icon } from "@rneui/themed";
import { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { Stack } from "../components/core";
import { CloseIconButton } from "../components/customized";
import theme from "../../assets/styles/theme";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { TouchableOpacity } from "react-native-gesture-handler";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "PhotoLibrary">;

export const PhotoLibraryScreen = ({ route }: IProps) => {
  const { album } = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [assets, setAssets] = useState<any>([]);
  const { width: imageWidth } = useWindowDimensions();

  const CACHE_DIRECTORY = `${FileSystem.cacheDirectory}media_assets`;

  useEffect(() => {
    (async () => {
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        console.log("Permission to access media library denied!");
        return;
      }

      const album = await MediaLibrary.getAlbumAsync("Recents");

      const { assets: initialAssets, endCursor } =
        await MediaLibrary.getAssetsAsync({
          first: 36,
          album,
          mediaType: [MediaLibrary.MediaType.photo],
        });

      setAssets(initialAssets);

      if (endCursor) {
        await loadMoreAssets(endCursor, album);
      }
    })();
  }, []);

  const loadMoreAssets = async (after: any, album: MediaLibrary.Album) => {
    const { assets: additionalAssets, endCursor } =
      await MediaLibrary.getAssetsAsync({
        first: 20,
        after,
        album,
        mediaType: [MediaLibrary.MediaType.photo],
      });

    setAssets((prevState: any) => [...prevState, ...additionalAssets]);

    if (endCursor) {
      await loadMoreAssets(endCursor, album);
    }
  };

  const handleSelect = async (asset: MediaLibrary.Asset) => {
    const assetUri = asset.uri;

    const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);

    const assetName = assetInfo.filename;
    const cacheFilePath = `${CACHE_DIRECTORY}/${assetName}`;

    await FileSystem.makeDirectoryAsync(CACHE_DIRECTORY, {
      intermediates: true,
    });

    FileSystem.downloadAsync(assetUri, cacheFilePath);

    const { width, height } = await ImageManipulator.manipulateAsync(
      cacheFilePath,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    // onSelect({
    //   uri: cacheFilePath,
    //   width,
    //   height,
    //   type: asset.mediaType === "photo" ? "image" : "video",
    // });
  };

  const renderPhoto = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          width: imageWidth / 3,
          height: imageWidth / 3,
          backgroundColor: "#eee",
          marginBottom: 1.25,
          marginLeft: index % 3 !== 0 ? 1.25 : 0,
        }}
      >
        <Image
          source={{ uri: item.uri }}
          containerStyle={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            flex: 1,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.screen}>
      <Stack direction="row" sx={{ padding: 15 }}>
        <CloseIconButton
          size={25}
          color={black}
          onPress={() => navigation.goBack()}
        />
        <Pressable onPress={() => navigation.navigate("PhotoAlbums")}>
          <Stack direction="row">
            <Text style={styles.title}>{album ? album : "Recents"}</Text>
            <Icon name="chevron-down" type="feather" size={22.5} />
          </Stack>
        </Pressable>
        <View style={{ width: 20 }} />
      </Stack>
      <FlatList
        data={assets}
        keyExtractor={(item: any) => item.id}
        numColumns={3}
        renderItem={renderPhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    color: black,
    marginRight: 2.5,
    fontWeight: "700",
    marginLeft: 5,
  },
});
