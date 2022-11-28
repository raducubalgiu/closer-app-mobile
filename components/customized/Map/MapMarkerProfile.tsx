import { StyleSheet } from "react-native";
import { memo } from "react";
import { Marker } from "react-native-maps";
import CustomAvatar from "../../core/Avatars/CustomAvatar";

type IProps = {
  latitude: number;
  longitude: number;
  avatar: any;
  size: number;
  onPress: () => void;
};

const MapMarkerProfile = ({
  latitude,
  longitude,
  avatar,
  size = 45,
  onPress,
}: IProps) => {
  return (
    <Marker onPress={onPress} coordinate={{ latitude, longitude }}>
      <CustomAvatar avatar={avatar} sx={styles.avatar} size={size} />
    </Marker>
  );
};

export default memo(MapMarkerProfile);

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2.5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
