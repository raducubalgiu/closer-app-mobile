import { FlatList, StyleSheet } from "react-native";
import CardProduct from "../../../components/customized/Cards/CardProduct";
import React from "react";
import NotFoundContent from "../../../components/customized/NotFoundContent/NotFoundContent";

const products = [
  // {
  //   _id: "1",
  //   name: "Tuns Scurt",
  //   description: "Include spalat, aranjat",
  //   price: 50,
  //   option: [
  //     {
  //       _id: "1",
  //       name: "Barbati",
  //     },
  //   ],
  // },
  // {
  //   _id: "2",
  //   name: "Tuns Lung",
  //   description: "Include spalat, aranjat",
  //   price: 75,
  //   option: [
  //     {
  //       _id: "1",
  //       name: "Barbati",
  //     },
  //   ],
  // },
  // {
  //   _id: "3",
  //   name: "Tuns Mediu",
  //   description: "Include spalat, aranjat",
  //   price: 50,
  //   option: [
  //     {
  //       _id: "1",
  //       name: "Barbati",
  //     },
  //   ],
  // },
];

let noFoundContent;
if (products.length === 0) {
  noFoundContent = (
    <NotFoundContent
      iconName="shoppingcart"
      iconType="antdesign"
      title="Listeaza-ti Produsele"
      description="Aici vei adauga produsele (serviciile) pe care le detii la locatie pentru ca acestea sa poata fi rezervate de catre clienti"
    />
  );
}

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
      ListHeaderComponent={noFoundContent}
    />
  );
};

export default ProductsProfileScreen;

const styles = StyleSheet.create({});
