import { useCallback } from "react";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { CardProduct } from "../../Cards/CardProduct";
import { useGetPaginate } from "../../../../hooks";
import { useIsFocused } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

export const SavedProductsTab = ({ user }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isPreviousData,
  } = useGetPaginate({
    model: "products",
    uri: `/users/${user?._id}/products/bookmarks`,
    limit: "10",
    enabled: !isPreviousData && isFocused,
  });

  const renderProduct = useCallback(({ item }) => {
    const { product, user: owner } = item;
    return (
      <CardProduct product={product} owner={owner} canBook={false} ownerInfo />
    );
  }, []);

  const keyExtractor = useCallback((item) => item._id, []);

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

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage
        title={t("products")}
        description={t("noFoundSavedProducts")}
      />
    );

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        data={pages?.map((page) => page.results).flat()}
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
