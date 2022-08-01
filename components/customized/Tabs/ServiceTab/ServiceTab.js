import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useAuth, useHttpGet } from "../../../../hooks";
import { CardProduct } from "../../Cards/CardProduct";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const ServiceTab = ({ userId, service }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: products, loading } = useHttpGet(
    `/users/${userId}/services/${service?._id}/products`
  );

  const noFoundProducts = (
    <NoFoundMessage
      sx={{ marginTop: 50 }}
      title={service.name}
      description={t("noFoundServiceProducts")}
    />
  );

  return (
    <View style={styles.screen}>
      {!loading &&
        products?.map((product, i) => (
          <CardProduct
            key={i}
            product={product}
            canBook={user?._id !== product?.user?._id}
          />
        ))}
      {!loading && !products.length && noFoundProducts}
      {loading && <ActivityIndicator style={{ marginVertical: 25 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});