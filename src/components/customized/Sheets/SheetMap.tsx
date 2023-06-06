import { StyleSheet, Text, Pressable, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { memo } from "react";
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
  subtitle: string;
  onClose: () => void;
};
const { black, grey0 } = theme.lightColors || {};

const SheetMap = ({
  latitude,
  longitude,
  height,
  width,
  subtitle,
  onClose,
}: IProps) => {
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
        <Stack>
          <Text style={styles.title}>{t("map")}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </Stack>
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
        showsUserLocation={true}
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
  icon: { padding: 15 },
  title: { fontWeight: "600", fontSize: 17, color: black },
  subtitle: { color: grey0, fontSize: 15 },
});

export default memo(SheetMap);
