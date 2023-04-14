import { StyleSheet, Text, Pressable } from "react-native";
import { Image } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { LibraryAlbum } from "../../../ts/interfaces/libraryAlbum";

const { black, grey0 } = theme.lightColors || {};

export const AlbumListItem = ({
  uri,
  title,
  assetCount,
  onPress,
}: LibraryAlbum) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Stack direction="row" justify="start">
        <Image
          source={{ uri }}
          containerStyle={styles.image}
          resizeMode="cover"
        />
        <Stack align="start" sx={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.assetCount}>{assetCount}</Text>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20, paddingHorizontal: 15 },
  details: {
    marginLeft: 10,
  },
  title: { color: black, fontWeight: "600", fontSize: 16, marginBottom: 2.5 },
  assetCount: { color: grey0 },
  image: { width: 80, height: 80 },
});
