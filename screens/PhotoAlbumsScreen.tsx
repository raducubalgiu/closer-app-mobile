import { View, StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { AlbumListItem } from "../components/customized/ListItems/AlbumListItem";
import { Stack } from "../components/core";
import { CloseIconButton } from "../components/customized/IconButtons/CloseIconButton";
import theme from "../assets/styles/theme";

const { black } = theme.lightColors;

export const PhotoAlbumsScreen = () => {
  const [albums, setAlbums] = useState([]);
  const navigation = useNavigation();

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
        onPress={() =>
          navigation.navigate({
            name: "PhotoLibrary",
            params: { album: item.title },
            merge: true,
          })
        }
        uri={item.uri}
        title={item.title}
        assetCount={item.assetCount}
      />
    );
  }, []);

  return (
    <View style={styles.screen}>
      <Stack direction="row" sx={{ padding: 15 }}>
        <CloseIconButton
          size={25}
          color={black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Albume</Text>
        <CloseIconButton size={25} color="white" onPress={() => {}} />
      </Stack>
      <FlashList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={renderAlbum}
        estimatedItemSize={100}
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
