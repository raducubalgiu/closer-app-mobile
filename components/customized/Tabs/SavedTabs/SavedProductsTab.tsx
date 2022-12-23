import { useCallback } from "react";
import { RefreshControl } from "react-native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { CardProduct } from "../../ListItems/ProductListItem";
import { useGetPaginate, useRefreshByUser } from "../../../../hooks";
import { useIsFocused } from "@react-navigation/native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Product } from "../../../../models/product";
import { User } from "../../../../models/user";

type ListRenderItemProduct = {
  id: string;
  productId: Product;
  userId: string;
};

export const SavedProductsTab = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useGetPaginate({
    model: "products",
    uri: `/users/${user?.id}/products/bookmarks`,
    limit: "10",
    enabled: isFocused,
  });

  const renderProduct = useCallback(
    ({ item }: ListRenderItemInfo<ListRenderItemProduct>) => {
      const { productId } = item;

      return (
        <CardProduct
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

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 50 }} />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const products = pages?.map((page) => page.results).flat();

  let header;
  if (!isLoading && !isFetchingNextPage && products?.length === 0) {
    header = (
      <NoFoundMessage
        title={t("products")}
        description={t("noFoundSavedProducts")}
      />
    );
  }

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        data={products}
        refreshControl={refreshControl}
        keyExtractor={keyExtractor}
        renderItem={renderProduct}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={261}
      />
    </>
  );
};
