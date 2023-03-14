import { useCallback } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import ProductListItem from "../../ListItems/ProductListItem";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { useIsFocused } from "@react-navigation/native";
import { Product } from "../../../../models/product";
import { User } from "../../../../models/user";

type ListRenderItemProduct = {
  id: string;
  productId: Product;
  userId: string;
};

export const SavedProductsTab = ({ user }: { user: User }) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "products",
    uri: `/users/${user?.id}/products/bookmarks`,
    limit: "10",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: products, showSpinner, loadMore } = usePaginateActions(options);

  const renderProduct = useCallback(
    ({ item }: ListRenderItemInfo<ListRenderItemProduct>) => {
      const { productId } = item;

      return (
        <ProductListItem
          product={productId}
          ownerInfo
          onDeleteProduct={() => {}}
          onEditProduct={() => {}}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback(
    (item: ListRenderItemProduct) => item.id,
    []
  );

  if (!isLoading && !isFetchingNextPage && products?.length === 0) {
    return (
      <NoFoundMessage
        title={t("products")}
        description={t("noFoundSavedProducts")}
      />
    );
  }

  return (
    <>
      {!loading && (
        <FlatList
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderProduct}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
