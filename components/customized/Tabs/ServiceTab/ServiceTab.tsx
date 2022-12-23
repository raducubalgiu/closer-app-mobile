import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useGetPaginate } from "../../../../hooks";
import ProductListItem from "../../ListItems/ProductListItem";
import { Product } from "../../../../models/product";

type IProps = {
  userId: string;
  service: any;
  option: any;
  initialRoute: string;
};

export const ServiceTab = ({
  userId,
  service,
  option,
  initialRoute,
}: IProps) => {
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "products",
      uri: `/users/${userId}/services/${service?.id}/products`,
      limit: "10",
      enabled: !!userId,
    });

  const { pages } = data || {};
  const products = pages?.map((page) => page.results).flat() || [];

  const renderProduct = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <ProductListItem
        product={item}
        ownerInfo={false}
        onDeleteProduct={() => {}}
        onEditProduct={() => {}}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Product) => item?.id, []);

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

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderProduct}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
