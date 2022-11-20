import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { CustomAvatar, IconButton, Stack } from "../components/core";
import { useGet } from "../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

export const MapScreen = ({ route }) => {
  const { _id } = route.params.profession;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const mapStyle = [
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  const { data: locations } = useGet({
    model: "locations",
    uri: `/locations/get-locations-map?latlng=26.100195,44.428286&profession=${_id}`,
  });

  return (
    <>
      <MapView
        style={{ height: "100%" }}
        initialRegion={{
          latitude: 44.425625,
          longitude: 26.102312,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
      >
        {locations?.map((loc, i) => (
          <MapView.Marker
            key={i}
            coordinate={{
              latitude: loc.address.coordinates[0],
              longitude: loc.address.coordinates[1],
            }}
          >
            <CustomAvatar
              avatar={loc.owner?.avatar}
              sx={{
                borderWidth: 2.5,
                borderColor: "white",
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
              size={50}
            />
          </MapView.Marker>
        ))}
      </MapView>
      <Stack
        direction="row"
        justify="between"
        sx={{
          position: "absolute",
          top: 40,
          width: "100%",
          padding: 15,
        }}
      >
        <IconButton
          sx={styles.btn}
          iconName="chevron-back"
          iconType="ionicon"
          onPress={() => navigation.goBack()}
        />
        <Stack
          sx={{ ...styles.btn, paddingHorizontal: 20, paddingVertical: 12.5 }}
        >
          <Text style={styles.status}>Inchide la ora 18</Text>
        </Stack>
        <IconButton sx={styles.btn} iconName="navigation" iconType="feather" />
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 12.5,
    borderColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  status: {
    fontWeight: "500",
    fontSize: 14.5,
  },
});
