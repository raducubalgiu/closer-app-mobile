import { StyleSheet, Text } from "react-native";
import { CModal, Button } from "../../core";

type IProps = {
  visible: boolean;
  onClose: () => void;
};

export const FilterRatingModal = ({ visible, onClose }: IProps) => {
  return (
    <CModal
      visible={visible}
      size="sm"
      headerTitle="Filtreaza ratingul"
      footer={
        <Button size="lg" radius={15} title="Filtreaza" onPress={() => {}} />
      }
      onCloseModal={onClose}
    >
      <Text>Hello World</Text>
    </CModal>
  );
};

const styles = StyleSheet.create({});
