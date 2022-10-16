import { StyleSheet } from "react-native";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";
import theme from "../../../assets/styles/theme";

export const AutocompleteGoogle = ({ onSetLocation }) => {
  return (
    <GooglePlacesAutocomplete
      styles={{
        container: { flex: 0, marginHorizontal: 15, marginTop: 10 },
        textInput: styles.textInput,
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
        listView: {
          borderBottomColor: 1,
          borderBottomColor: "#ddd",
        },
      }}
      minLength={2}
      placeholder="Cauta-ti afacerea sau adresa"
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={400}
      returnKeyType={"search"}
      enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        console.log(details);
        onSetLocation({
          street: details?.address_components[1]?.long_name,
          number: details?.address_components[0]?.long_name,
          city: details?.address_components[2]?.long_name,
          county: details?.address_components[3]?.long_name,
          country: details?.address_components[6]?.long_name,
          coordinates: [
            details.geometry.location.lat * 1,
            details.geometry.location.lng * 1,
          ],
        });
      }}
      fetchDetails={true}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: "ro",
        components: "country:ro",
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    color: theme.lightColors.black,
    fontSize: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
