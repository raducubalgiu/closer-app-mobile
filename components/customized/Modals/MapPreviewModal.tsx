import { StyleSheet } from "react-native";
import { CModal, IconButton } from "../../core";
import { MapStatic } from "../Map/MapStatic";

type IProps = {
  visible: boolean;
  onCloseModal: () => void;
  longitude: number;
  latitude: number;
};

export const MapPreviewModal = ({
  visible,
  longitude,
  latitude,
  onCloseModal,
}: IProps) => {
  return (
    <CModal
      visible={visible}
      size="xl"
      onCloseModal={onCloseModal}
      header={false}
    >
      <MapStatic
        height={"100%"}
        longitude={longitude}
        latitude={latitude}
        zoomEnabled={true}
        scrollEnabled={true}
        isModal={true}
        sx={{ borderRadius: 5 }}
      />
      <IconButton
        name="close"
        type="material"
        onPress={onCloseModal}
        size={20}
        sx={{ top: 15, ...styles.button }}
      />
    </CModal>
  );
};

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
