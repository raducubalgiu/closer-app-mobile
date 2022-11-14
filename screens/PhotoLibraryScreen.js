import { StyleSheet, Text, View } from "react-native";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Button, Stack } from "../components/core";
import { CloseIconButton } from "../components/customized";
import theme from "../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { CardPostImage } from "../components/customized";

const { black } = theme.lightColors;

export const PhotoLibraryScreen = ({ route }) => {
  const { album, nav } = route.params || {};
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);

  console.log("NAV!!!", nav);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPhotos = async () => {
        const getPhotos = await MediaLibrary.getAlbumAsync(
          album ? album : "Recents"
        );
        const { assets, endCursor, hasNextPage } =
          await MediaLibrary.getAssetsAsync({
            album: getPhotos,
            mediaType: ["photo"],
            first: 20,
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
        onPress={() => navigation.navigate(nav, { uri: item.uri })}
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
        <Button onPress={() => navigation.navigate("PhotoAlbums")}>
          <Stack direction="row">
            <Text style={styles.title}>{album ? album : "Recents"}</Text>
            <Icon name="chevron-down" type="feather" size={22.5} />
          </Stack>
        </Button>
        <CloseIconButton size={25} color="white" />
      </Stack>
      <FlashList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={4}
        renderItem={renderPhoto}
        estimatedItemSize={95}
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
