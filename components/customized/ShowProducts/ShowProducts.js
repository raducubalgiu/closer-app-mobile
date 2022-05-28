import { StyleSheet, FlatList, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CardProduct } from "../Cards/CardProduct";
import { NoFoundMessage } from "../NotFoundContent/NoFoundMessage";
import { Button } from "../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks";
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
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    if (product) {
      setActiveService(product.service);
      fetchProducts();
    }
  }, [product]);

  const fetchProducts = useCallback(() => {
    if (userId && activeService) {
      axios
        .get(
          `${BASE_ENDPOINT}/users/${userId}/services/${activeService}/products`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const renderProducts = useCallback(
    ({ item }) => (
      <CardProduct
        product={item}
        onEditProduct={() => navigation.push("EditProduct", { product: item })}
        onDeleteProduct={() => deleteProductHandler(item?._id)}
        canBook={user?._id !== item?.user}
      />
    ),
    []
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

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={products}
      keyExtractor={(item) => item?._id}
      renderItem={renderProducts}
      showsVerticalScrollIndicator={false}
      bounces={false}
      ListFooterComponent={
        products.length === 0 && (
          <NoFoundMessage
            sx={{ marginTop: 20 }}
            title={t("myProducts")}
            description={t("notProductsAddedForService")}
          />
        )
      }
    />
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
