import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type IProps = {
  longitude: number;
  latitude: number;
  height?: number | string;
  sx?: {};
  minZoom?: number;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
};

export const MapStatic = ({
  longitude,
  latitude,
  height = 250,
  sx = {},
  minZoom = 13,
  zoomEnabled = false,
  scrollEnabled = false,
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
    </MapView>
  );
};
