import { StyleSheet, FlatList, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CardProduct } from "../Cards/CardProduct";
import { Button, Spinner, Stack } from "../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { useAuth, useHttpGet } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { BASE_ENDPOINT } from "@env";

export const ShowProducts = ({
  userId,
  product,
  serviceId,
  initServ,
  services,
}) => {
  const [products, setProducts] = useState([]);
  const [activeService, setActiveService] = useState(
    serviceId ? serviceId : initServ
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (product) {
      setActiveService(product.service);
      fetchProducts();
    }
  }, [product]);

  const fetchProducts = useCallback(() => {
    if (userId && activeService) {
      setLoading(true);
      axios
        .get(
          `${BASE_ENDPOINT}/users/${userId}/services/${activeService}/products`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [userId, activeService]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChangeService = useCallback(
    (service) => setActiveService(service),
    []
  );

  const deleteProductHandler = useCallback((productId) => {
    axios
      .delete(`${BASE_ENDPOINT}/users/${user?._id}/products/${productId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        setProducts((products) =>
          products.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const activeStyle = { ...styles.button, ...styles.activeBtn };
  const activeTxtStyle = { ...styles.btnText, ...styles.activeBtnText };

  const renderService = useCallback(
    ({ item }) => (
      <Button
        sx={item._id === activeService ? activeStyle : styles.button}
        onPress={() => handleChangeService(item?._id)}
      >
        <Text
          style={item._id === activeService ? activeTxtStyle : styles.btnText}
        >
          {item.name}
        </Text>
      </Button>
    ),
    [activeService]
  );

  const renderHeader = (
    <FlatList
      nestedScrollEnabled={true}
      horizontal
      data={services}
      keyExtractor={(item) => item?._id}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.headerContainer}
      renderItem={renderService}
    />
  );

  const renderProducts = useCallback(
    (product, i) => (
      <CardProduct
        key={i}
        product={product}
        onEditProduct={() => navigation.push("EditProduct", { product })}
        onDeleteProduct={() => deleteProductHandler(product?._id)}
        canBook={user?._id !== product?.user?._id}
      />
    ),
    [product]
  );

  return (
    <>
      <View>{renderHeader}</View>
      {!loading && products.map((product, i) => renderProducts(product, i))}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: { marginTop: 15, paddingRight: 15 },
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginLeft: 15,
  },
  activeBtn: {
    backgroundColor: theme.lightColors.primary,
  },
  btnText: {
    fontFamily: "Exo-SemiBold",
  },
  activeBtnText: { color: "white" },
});
