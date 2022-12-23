import { memo } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { IconButton } from "../../core";

type IProps = {
  longitude: number;
  latitude: number;
  height?: number | string;
  sx?: {};
  minZoom?: number;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
  onOpenModal?: () => void;
  isModal?: boolean;
};

const MapStatic = ({
  longitude,
  latitude,
  height = 250,
  sx = {},
  minZoom = 13,
  zoomEnabled = false,
  scrollEnabled = false,
  onOpenModal,
  isModal = false,
}: IProps) => {
  const mapStyle = [
    {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  return (
    <MapView
      customMapStyle={mapStyle}
      style={{ height, width: "100%", ...sx }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={PROVIDER_GOOGLE}
      zoomEnabled={zoomEnabled}
      pitchEnabled={true}
      scrollEnabled={scrollEnabled}
      minZoomLevel={minZoom}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        image={require("../../../assets/images/map_marker.png")}
      />
      {!isModal && (
        <IconButton
          name="maximize-2"
          size={20}
          onPress={onOpenModal}
          sx={{ ...styles.button, bottom: 15 }}
        />
      )}
    </MapView>
  );
};

export default memo(MapStatic);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    position: "absolute",
    right: 15,
  },
});
