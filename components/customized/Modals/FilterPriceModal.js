import { StyleSheet, Text } from "react-native";
import React from "react";
import { CModal, MainButton } from "../../core";

export const FilterPriceModal = ({ visible, onClose }) => {
  return (
    <CModal
      visible={visible}
      size="sm"
      headerTitle="Filtreaza pretul"
      footer={<MainButton title="Submit" />}
      onCloseModal={onClose}
    >
      <Text>Hello World</Text>
    </CModal>
  );
};

const styles = StyleSheet.create({});
