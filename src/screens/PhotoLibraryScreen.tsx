import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Stack } from "../components/core";
import { CloseIconButton } from "../components/customized";
import theme from "../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import PostListItem from "../components/customized/ListItems/Post/PostImageListItem";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Post } from "../ts";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "PhotoLibrary">;

export const PhotoLibraryScreen = ({ route }: IProps) => {
  const { album, nav } = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [photos, setPhotos] = useState<any>([]);

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
            //after: endCursor,
          });
        setPhotos(assets);
      };

      fetchPhotos();

      return () => {
        isActive = false;
      };
    }, [album])
  );

  const renderPhoto = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => (
      <PostListItem
        image={item.uri}
        col={4}
        onPress={() => {
          navigation.goBack();
          navigation.navigate(nav, { photo: item });
        }}
      />
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
      <FlashList
        data={photos}
        keyExtractor={(item: any) => item.id}
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
