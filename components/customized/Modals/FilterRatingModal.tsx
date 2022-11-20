import { StyleSheet, Text } from "react-native";
import { CModal, MainButton } from "../../core";

export const FilterRatingModal = ({ visible, onClose }) => {
  return (
    <CModal
      visible={visible}
      size="sm"
      headerTitle="Filtreaza ratingul"
      footer={
        <MainButton
          size="lg"
          radius={15}
          title="Filtreaza"
          onPress={() => {}}
        />
      }
      onCloseModal={onClose}
    >
      <Text>Hello World</Text>
    </CModal>
  );
};

const styles = StyleSheet.create({});