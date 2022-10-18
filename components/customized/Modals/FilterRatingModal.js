import { StyleSheet, Text } from "react-native";
import React from "react";
import { CModal, MainButton } from "../../core";

export const FilterRatingModal = ({ visible, onClose }) => {
  return (
    <CModal
      visible={visible}
      size="sm"
      headerTitle="Filtreaza ratingul"
      footer={<MainButton title="Submit" />}
      onCloseModal={onClose}
    >
      <Text>Hello World</Text>
    </CModal>
  );
};

const styles = StyleSheet.create({});
