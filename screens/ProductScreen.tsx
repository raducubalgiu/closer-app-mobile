import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "Product">;

export const ProductScreen = ({ route }: IProps) => {
  const { product } = route.params;

  return (
    <SafeAreaView>
      <Header title={product.name} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
