import { FAB } from "@rneui/themed";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type IProps = {
  longitude: number;
  latitude: number;
  height?: number | string;
  sx?: {};
  onOpenModal?: () => void;
};

const MapStatic = ({
  longitude,
  latitude,
  height = 250,
  sx = {},
  onOpenModal,
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

  const iconProps = { name: "maximize-2", type: "feather", color: "black" };

  return (
    <View>
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
        pitchEnabled={true}
        scrollEnabled={false}
        minZoomLevel={13}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          image={require("../../../assets/images/map_marker.png")}
        />
      </MapView>
      <FAB
        visible={true}
        onPress={onOpenModal}
        icon={iconProps}
        color="white"
        activeOpacity={1}
        containerStyle={styles.button}
        size="small"
      />
    </View>
  );
};

export default memo(MapStatic);

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});
