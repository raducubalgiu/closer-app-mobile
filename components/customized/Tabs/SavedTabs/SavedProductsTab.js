import { View } from "react-native";
import React from "react";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useHttpGet } from "../../../../hooks";

export const SavedProductsTab = ({ user }) => {
  const { t } = useTranslation();

  const { data: products, loading } = useHttpGet(
    `/users/${user?._id}/bookmarks/products`
  );

  const noFoundProducts = (
    <NoFoundMessage
      title={t("products")}
      description={t("noFoundSavedProducts")}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {!products?.length && !loading && noFoundProducts}
      {loading && <Spinner />}
    </View>
  );
};
