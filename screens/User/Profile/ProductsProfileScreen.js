import { FlatList, StyleSheet, View } from "react-native";
import axios from "axios";
import CardProduct from "../../../components/customized/Cards/CardProduct";
import React, { useState } from "react";
import NotFoundContent from "../../../components/customized/NotFoundContent/NotFoundContent";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../context/auth";
import { Spinner } from "../../../components/core";

const ProductsProfileScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const { user } = useAuth();
  const { userId } = props;

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/products`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          console.log("FETCH PRODUCTS");
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, [userId, user?.token])
  );

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

  console.log(user?._id);

  return (
    <>
      {!loading && (
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
              canBook={item?.user !== user?._id}
            />
          )}
          ListHeaderComponent={noFoundContent}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

export default ProductsProfileScreen;
