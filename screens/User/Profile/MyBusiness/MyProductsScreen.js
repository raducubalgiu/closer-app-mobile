import { FlatList, SafeAreaView, Text, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  Header,
  Button,
  Feedback,
  IconButtonAdd,
  Spinner,
  Stack,
} from "../../../../components/core";
import {
  CardProduct,
  NoFoundProducts,
} from "../../../../components/customized";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";

const MyProductsScreen = ({ route }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const { product, serviceId } = route.params || {};
  const initServ = user?.services[0]?._id;
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [activeService, setActiveService] = useState(
    serviceId ? serviceId : initServ
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    if (product) {
      setActiveService(product.service);
      fetchProducts();
      setFeedback({
        visible: true,
        message: t("productAddedMessage"),
      });
    }
  }, [product]);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/services/${activeService}/products`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(() => {
        setFeedback({ visible: true, message: t("somethingWentWrongLater") });
        setLoading(false);
      });
  }, [activeService]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProductHandler = useCallback((productId) => {
    axios
      .delete(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() => {
        setProducts((products) =>
          products.filter((product) => product._id !== productId)
        );
        setFeedback({ visible: true, message: t("productRemovedMessage") });
      })
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  }, []);

  const goToAddProduct = () => navigation.navigate("AddProducts");
  const handleChangeService = useCallback(
    (service) => setActiveService(service),
    []
  );
  const activeStyle = { ...styles.button, ...styles.activeBtn };
  const activeTxtStyle = { ...styles.btnText, ...styles.activeBtnText };

  const renderService = ({ item }) => (
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
  );

  const renderHeader = (
    <>
      <FlatList
        horizontal
        data={user?.services}
        keyExtractor={(item) => item?._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.headerContainer}
        renderItem={renderService}
      />
      {loading && (
        <Stack sx={{ marginVertical: 10 }}>
          <Spinner />
        </Stack>
      )}
    </>
  );

  const renderProducts = ({ item }) => (
    <CardProduct
      name={item?.name}
      description={item?.description}
      price={item?.price}
      duration={item?.duration}
      option={item?.option?.name}
      onEditProduct={() =>
        navigation.navigate("EditProduct", {
          product: item,
        })
      }
      onDeleteProduct={() => deleteProductHandler(item?._id)}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myProducts")}
        actionBtn={
          <IconButtonAdd
            onPress={goToAddProduct}
            disabled={user.services.length === 0}
          />
        }
        divider
      />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={products}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={{ marginTop: 10 }}
        renderItem={renderProducts}
        ListFooterComponent={
          products.length === 0 && (
            <Stack sx={{ marginTop: 75 }}>
              <NoFoundProducts />
            </Stack>
          )
        }
      />
    </SafeAreaView>
  );
};

export default MyProductsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  divider: { marginTop: 10, marginBottom: 20 },
  headerContainer: { marginTop: 10, paddingRight: 15 },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 2.5,
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
