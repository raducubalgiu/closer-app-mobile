import { StyleSheet, Text, Image } from "react-native";
import React from "react";
import { Button, Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

export const AlbumListItem = ({ uri, title, assetCount, onPress }) => {
  return (
    <Button onPress={onPress} style={styles.container}>
      <Stack direction="row" justify="start">
        <Image
          source={{
            uri,
          }}
          style={{ width: 80, height: 80 }}
        />
        <Stack align="start" sx={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.assetCount}>{assetCount}</Text>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20, paddingHorizontal: 15 },
  details: {
    marginLeft: 10,
  },
  title: { color: black, fontWeight: "600", fontSize: 16, marginBottom: 2.5 },
  assetCount: { color: grey0 },
});
