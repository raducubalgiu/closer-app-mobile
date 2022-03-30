import { FlatList, StyleSheet, Text, View } from "react-native";
import CardProduct from "../../../components/Cards/CardProduct";
import React from "react";

const products = [
  {
    _id: "1",
    name: "Tuns Scurt",
    description: "Include spalat, aranjat",
    price: 50,
    option: [
      {
        _id: "1",
        name: "Barbati",
      },
    ],
  },
  {
    _id: "2",
    name: "Tuns Lung",
    description: "Include spalat, aranjat",
    price: 75,
    option: [
      {
        _id: "1",
        name: "Barbati",
      },
    ],
  },
  {
    _id: "3",
    name: "Tuns Mediu",
    description: "Include spalat, aranjat",
    price: 50,
    option: [
      {
        _id: "1",
        name: "Barbati",
      },
    ],
  },
];

const ProductsProfileScreen = () => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CardProduct
          name={item.name}
          description={item.description}
          price={item.price}
          option={item.option[0].name}
        />
      )}
    />
  );
};

export default ProductsProfileScreen;

const styles = StyleSheet.create({});
