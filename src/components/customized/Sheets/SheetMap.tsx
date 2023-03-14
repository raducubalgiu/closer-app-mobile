import { BottomSheetView } from "@gorhom/bottom-sheet";
import { memo } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

type IProps = {
  latitude: number;
  longitude: number;
  height: number;
  width: number;
  onClose: () => void;
};
const { black } = theme.lightColors || {};

const SheetMap = ({ latitude, longitude, height, width, onClose }: IProps) => {
  const { t } = useTranslation("common");

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

  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <BottomSheetView>
      <Stack direction="row">
        <Icon name="close" color="white" style={styles.icon} />
        <Text style={styles.title}>{t("map")}</Text>
        <Pressable style={styles.icon} onPress={onClose}>
          <Icon name="close" color={black} size={22.5} />
        </Pressable>
      </Stack>
      <MapView
        customMapStyle={mapStyle}
        style={{ height, width }}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        pitchEnabled={true}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          image={require("../../../../assets/images/map_marker.png")}
        />
      </MapView>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  icon: { paddingVertical: 10, paddingHorizontal: 15 },
  title: { fontWeight: "500", fontSize: 17, color: black },
});

export default memo(SheetMap);
