import { FlatList } from "react-native";
import axios from "axios";
import CardProduct from "../../Cards/CardProduct";
import React, { useState } from "react";
import NotFoundContent from "../../NotFoundContent/NotFoundContent";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../../context/auth";
import { Spinner } from "../../../core";

export const ProductsProfileTab = (props) => {
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

  const deleteProductHandler = (productId) => {
    axios
      .delete(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() =>
        setProducts((products) =>
          products.filter((product) => product._id !== productId)
        )
      )
      .catch((err) => console.log(err));
  };

  const renderProducts = ({ item }) => (
    <CardProduct
      name={item.name}
      description={item.description}
      price={item.price}
      option={item.option[0].name}
      canBook={item?.user !== user?._id}
      duration={item?.duration}
      onEditProduct={() =>
        navigation.navigate("EditProduct", {
          product: item,
        })
      }
      onDeleteProduct={() => deleteProductHandler(item?._id)}
    />
  );

  return (
    <>
      {!loading && (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderProducts}
          ListHeaderComponent={noFoundContent}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
