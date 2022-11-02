import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useAuth, useGet, useHttpGet } from "../../../../hooks";
import { CardProduct } from "../../Cards/CardProduct";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const ServiceTab = ({ userId, service, option }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: products } = useGet({
    uri: `/users/${userId}/services/${service?._id}/products`,
  });

  let filteredProducts;
  if (option)
    filteredProducts = products.filter(
      (prod) => prod?.option._id === option?._id
    );
  const results = option ? filteredProducts : products;

  const noFoundProducts = (
    <NoFoundMessage
      sx={{ marginTop: 50 }}
      title={service.name}
      description={t("noFoundServiceProducts")}
    />
  );

  return (
    <View style={styles.screen}>
      {results?.map((product, i) => (
        <CardProduct
          key={i}
          product={product}
          canBook={user?._id !== product?.user?._id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
