import { StyleSheet, Text } from "react-native";
import { CModal, MainButton } from "../../core";
import React from "react";

export const FilterDistanceModal = ({ visible, onClose }) => {
  return (
    <CModal
      visible={visible}
      size="sm"
      headerTitle="Filtreaza distanta"
      footer={<MainButton size="lg" radius={15} title="Filtreaza" />}
      onCloseModal={onClose}
    >
      <Text>Hello World</Text>
    </CModal>
  );
};

const styles = StyleSheet.create({});
