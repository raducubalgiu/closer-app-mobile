import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Stack } from "../components/core";
import { useNavigation } from "@react-navigation/native";
import {
  CloseIconButton,
  LibraryAlbumsList,
  LibraryPhotosList,
} from "../components/customized";
import theme from "../assets/styles/theme";
import { Icon } from "@rneui/themed";

const { black } = theme.lightColors;

export const PhotoLibraryScreen = () => {
  const navigation = useNavigation();
  const [assets, setAssets] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState("Recents");

  return (
    <View style={styles.screen}>
      <Stack direction="row" sx={{ padding: 15 }}>
        <CloseIconButton
          size={25}
          color={black}
          onPress={() => navigation.goBack()}
        />
        <Button onPress={() => setAssets((assets) => !assets)}>
          <Stack direction="row">
            <Text style={styles.title}>{selectedAlbum}</Text>
            {assets && <Icon name="chevron-down" type="feather" size={22.5} />}
            {!assets && <Icon name="chevron-up" type="feather" size={22.5} />}
          </Stack>
        </Button>
        <CloseIconButton size={25} color="white" />
      </Stack>
      {assets && <LibraryPhotosList album={selectedAlbum} />}
      {!assets && (
        <LibraryAlbumsList
          onAssets={(item) => {
            setSelectedAlbum(item);
            setAssets(true);
          }}
        />
      )}
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
