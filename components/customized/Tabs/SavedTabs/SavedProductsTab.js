import { View } from "react-native";
import React, { useCallback } from "react";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useHttpGet } from "../../../../hooks";
import { FlatList } from "react-native-gesture-handler";
import { CardProduct } from "../../Cards/CardProduct";

export const SavedProductsTab = ({ user }) => {
  const { t } = useTranslation();

  const { data: products, loading } = useHttpGet(
    `/users/${user?._id}/products/bookmarks`
  );

  const noFoundProducts = (
    <NoFoundMessage
      title={t("products")}
      description={t("noFoundSavedProducts")}
    />
  );

  const renderProduct = useCallback(({ item }) => {
    const { product, user: owner } = item;
    return (
      <CardProduct product={product} owner={owner} canBook={false} ownerInfo />
    );
  }, []);
  const keyExtractor = useCallback((item) => item._id, []);

  return (
    <View style={{ flex: 1 }}>
      {!loading && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderProduct}
        />
      )}
      {!loading && products.length === 0 && noFoundProducts}
      {loading && <Spinner />}
    </View>
  );
};
