import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const MapStatic = ({ height = 250, sx = {}, longitude, latitude }) => {
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
      zoomEnabled={false}
      pitchEnabled={false}
      scrollEnabled={false}
      minZoomLevel={13}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        image={require("../../../assets/images/map_marker.png")}
      />
    </MapView>
  );
};
