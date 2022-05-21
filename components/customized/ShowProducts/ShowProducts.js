import { StyleSheet, FlatList, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CardProduct } from "../Cards/CardProduct";
import { NoFoundMessage } from "../NotFoundContent/NoFoundMessage";
import { Button, Stack } from "../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks";

export const ShowProducts = ({
  userId,
  product,
  serviceId,
  initServ,
  services,
  onDeleteProduct,
  extraHeader,
}) => {
  const [products, setProducts] = useState([]);
  const [activeService, setActiveService] = useState(
    serviceId ? serviceId : initServ
  );
  const { user } = useAuth();
  const { t } = useTranslation();

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
          `${process.env.BASE_ENDPOINT}/users/${userId}/services/${activeService}/products`,
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
    []
  );

  const renderProducts = useCallback(
    ({ item }) => (
      <CardProduct
        name={item?.name}
        description={item?.description}
        price={item?.price}
        duration={item?.duration}
        option={item?.option?.name}
        onEditProduct={() => {}}
        onDeleteProduct={() => onDeleteProduct(item?._id)}
        canBook={user?._id !== item?.user}
      />
    ),
    []
  );

  const renderHeader = (
    <>
      {extraHeader}
      <FlatList
        horizontal
        data={services}
        keyExtractor={(item) => item?._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.headerContainer}
        renderItem={renderService}
      />
    </>
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
          <Stack sx={{ marginTop: 75 }}>
            <NoFoundMessage
              title={t("myProducts")}
              description={t("notProductsAddedForService")}
            />
          </Stack>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  divider: { marginTop: 10, marginBottom: 20 },
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
