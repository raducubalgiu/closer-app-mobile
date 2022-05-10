import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton, Stack, Modal, Header } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import CardProduct from "../../../../components/customized/Cards/CardProduct";
import { useModal } from "../../../../hooks/useModal";
import {
  AddProductsForm,
  EditProductsForm,
} from "../../../../components/customized/Forms";
import axios from "axios";
import { useAuth } from "../../../../context/auth";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const MyProductsScreen = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useModal();
  const navigation = useNavigation();

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
  }, []);

  const addProductHandler = (product) => {
    setProducts((products) => products.concat(product));
    dispatch({ type: "CLOSE_MODAL" });
  };
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
        ListHeaderComponent={loading && <ActivityIndicator />}
        data={products}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CardProduct
            name={item?.name}
            description={item?.description}
            price={item?.price}
            actionBtns={
              <Stack direction="row">
                <IconButton
                  iconName="edit"
                  iconType="antdesign"
                  onPress={() => {
                    setProductId(item?._id);
                    dispatch({ type: "EDIT" });
                  }}
                />
                <IconButton
                  iconName="delete"
                  iconType="antdesign"
                  onPress={() => deleteProductHandler(item?._id)}
                  sx={{ marginLeft: 20 }}
                />
              </Stack>
            }
          />
        )}
      />
      <Modal
        title={state.edit ? "Editeaza produsul" : "Adauga produs"}
        open={state.open}
        closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Divider style={styles.divider} />
        {state.add && <AddProductsForm onAddProduct={addProductHandler} />}
        {state.edit && (
          <EditProductsForm productId={productId} onEditProduct={() => {}} />
        )}
      </Modal>
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
