import { StyleSheet, Text } from "react-native";
import { CModal, MainButton } from "../../core";

export const FilterDistanceModal = ({ visible, onClose, onHandleDistance }) => {
  return (
    <CModal
      visible={visible}
      size="sm"
      headerTitle="Filtreaza distanta"
      footer={
        <MainButton
          onPress={onHandleDistance}
          size="lg"
          radius={15}
          title="Filtreaza"
        />
      }
      onCloseModal={onClose}
    >
      <Text>Hello World</Text>
    </CModal>
  );
};

const styles = StyleSheet.create({});
