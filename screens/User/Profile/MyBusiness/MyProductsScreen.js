import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton, Header, Spinner } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import CardProduct from "../../../../components/customized/Cards/CardProduct";
import axios from "axios";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const MyProductsScreen = ({ route }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.product) {
      console.log(route.params.product);
      setProducts([route.params?.product, ...products]);
    }
  }, [route.params?.product]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/products`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setLoading(false);
  }, []);

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
      name={item?.name}
      description={item?.description}
      price={item?.price}
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
    <SafeAreaView style={styles.screen}>
      <Header
        title="Produsele mele"
        withTooltip={true}
        actionBtn={
          <IconButton
            iconName="plussquare"
            iconType="antdesign"
            onPress={() => navigation.navigate("AddProducts")}
            color={theme.lightColors.primary}
          />
        }
      />
      <FlatList
        ListHeaderComponent={loading && <Spinner />}
        data={products}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={{ marginTop: 10 }}
        renderItem={renderProducts}
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
});
