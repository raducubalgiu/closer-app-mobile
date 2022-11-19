import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { IconButton, Stack } from "../components/core";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import * as MediaLibrary from "expo-media-library";
import { useTranslation } from "react-i18next";
import { PresetListItem } from "../components/customized";
import { PhotoLibraryButton } from "../components/customized/Buttons/PhotoLibraryButton";

const { height, width } = Dimensions.get("window");
const { primary } = theme.lightColors;

const DUMMY_PRESETS = [
  { _id: "1", name: "Normal" },
  {
    _id: "2",
    name: "Clarendon",
  },
  { _id: "3", name: "Gingam" },
  { _id: "4", name: "Werido" },
  { _id: "5", name: "Paris" },
  {
    _id: "6",
    name: "Normandia",
  },
];

export const AddPostScreen = ({ route }) => {
  const [initialUri, setInitialUri] = useState(null);
  const { uri } = route.params || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPhotos = async () => {
        const getPhotos = await MediaLibrary.getAlbumAsync("Recents");
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: getPhotos,
          mediaType: ["photo"],
          first: 1,
        });

        setInitialUri(assets[0]?.uri);
      };

      fetchPhotos();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" sx={{ marginLeft: 15 }}>
        <IconButton
          iconName="arrow-back-ios"
          color="white"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>
          {t("newPost")}
        </Text>
        <IconButton iconName="arrow-back-ios" color="black" size={20} />
      </Stack>
      <Stack align="start" sx={{ padding: 15 }}>
        <View style={{ width: "100%", height: height / 2 }}>
          <Image
            source={{ uri: uri ? uri : initialUri }}
            resizeMode="cover"
            style={{ flex: 1 }}
          />
        </View>
        <Stack direction="row" align="start" sx={{ marginTop: 15 }}>
          <IconButton
            iconName="camera"
            color={"white"}
            size={20}
            sx={{
              backgroundColor: primary,
              borderRadius: 50,
              padding: 7.5,
              opacity: 0.9,
              marginRight: 15,
            }}
          />
          <IconButton
            iconName="crop"
            color={"white"}
            size={20}
            sx={{
              backgroundColor: "grey",
              borderRadius: 50,
              padding: 7.5,
              opacity: 0.9,
              marginRight: 15,
            }}
          />
          <IconButton
            iconName="camera"
            iconType="feather"
            color={"white"}
            size={20}
            sx={{
              backgroundColor: "grey",
              borderRadius: 50,
              padding: 7.5,
              opacity: 0.9,
              marginRight: 15,
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        <FlatList
          horizontal
          data={DUMMY_PRESETS}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PresetListItem uri={uri ? uri : initialUri} name={item.name} />
          )}
          contentContainerStyle={{ marginLeft: 15, marginVertical: 10 }}
        />
      </Stack>
      <Stack direction="row" sx={{ padding: 15 }}>
        <PhotoLibraryButton
          uri={uri ? uri : initialUri}
          onPress={() =>
            navigation.navigate("PhotoLibrary", { nav: "AddPost" })
          }
        />
        <IconButton
          iconName="arrow-right"
          iconType="feather"
          size={30}
          color="white"
          sx={{ backgroundColor: primary, borderRadius: 50, padding: 10 }}
        />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
});
