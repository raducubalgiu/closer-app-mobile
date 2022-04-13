import { FlatList, StyleSheet } from "react-native";
import CardProduct from "../../../components/customized/Cards/CardProduct";
import React from "react";
import NotFoundContent from "../../../components/customized/NotFoundContent/NotFoundContent";

const ProductsProfileScreen = (props) => {
  const { products } = props;

  let noFoundContent;
  if (products?.length === 0) {
    noFoundContent = (
      <NotFoundContent
        iconName="shoppingcart"
        iconType="antdesign"
        title="Listeaza-ti Produsele"
        description="Aici vei adauga produsele (serviciile) pe care le detii la locatie pentru ca acestea sa poata fi rezervate de catre clienti"
      />
    );
  }

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
