import { StyleSheet, Text, Image } from "react-native";
import { Stack } from "../../core";

export const PresetListItem = ({ uri, name }) => {
  return (
    <Stack justify="start" sx={{ marginRight: 5 }}>
      <Image source={{ uri }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  image: { width: 100, height: 100 },
  name: { color: "white", fontWeight: "500", marginTop: 5 },
});
