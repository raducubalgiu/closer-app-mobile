import { StyleSheet, Text, Pressable, Image } from "react-native";
import { memo } from "react";
import { Stack, IconStar, Spinner } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

const CardLocationMap = ({ onPress, sx = {}, item, isLoading }) => {
  const { owner, images, address } = item;

  return (
    <Pressable onPress={onPress} style={{ ...styles.button, ...sx }}>
      {!isLoading && (
        <Stack direction="row" align="start" sx={{ width: "100%" }}>
          <Image source={{ uri: images[0].url }} style={styles.image} />
          <Stack align="start" sx={{ flex: 1, padding: 10 }}>
            <Text style={styles.name}>{owner.name}</Text>
            <Text style={styles.address}>
              {address.street} {address.number}, {address.city}
            </Text>
            <Stack direction="row" sx={{ marginTop: 5 }}>
              <IconStar />
              <Text style={styles.ratings}>{owner.ratingsAverage}</Text>
            </Stack>
          </Stack>
        </Stack>
      )}
      {isLoading && <Spinner />}
    </Pressable>
  );
};

export default memo(CardLocationMap);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 5,
    height: 130,
  },
  image: {
    width: 130,
    height: 130,
    borderTopLeftRadius: 2.5,
    borderBottomLeftRadius: 2.5,
  },
  name: { color: black, fontWeight: "700", fontSize: 15 },
  address: { color: grey0, fontSize: 13.5, marginTop: 2.5 },
  ratings: {
    color: black,
    fontWeight: "800",
    marginLeft: 2.5,
  },
});
