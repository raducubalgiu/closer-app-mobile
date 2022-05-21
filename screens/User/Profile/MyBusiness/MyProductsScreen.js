import { SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Header, IconButtonAdd } from "../../../../components/core";
import { ShowProducts } from "../../../../components/customized";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";

const MyProductsScreen = ({ route }) => {
  const { user } = useAuth();
  const { services } = user;
  const { product, serviceId } = route.params || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

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
      })
      .catch((err) => console.log(err));
  }, []);

  const goToAddProduct = () => navigation.navigate("AddProducts");

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
      <ShowProducts
        userId={user?._id}
        product={product}
        services={services}
        initServ={services[0]?._id}
        serviceId={serviceId}
        onDeleteProduct={deleteProductHandler}
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
