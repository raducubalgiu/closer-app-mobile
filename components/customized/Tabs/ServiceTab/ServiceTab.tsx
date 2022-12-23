import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useGetPaginate } from "../../../../hooks";
import ProductListItem from "../../ListItems/ProductListItem";
import { Product } from "../../../../models/product";
import theme from "../../../../assets/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

type IProps = {
  userId: string;
  service: any;
  option: any;
  initialRoute: string;
};

const { black } = theme.lightColors || {};

export const ServiceTab = ({
  userId,
  service,
  option,
  initialRoute,
}: IProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const ref = useRef<FlatList>(null);
  const [initialOption, setInitialOption] = useState(
    option ? option : service.filters[0].options[0]._id
  );

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPaginate({
      model: "products",
      uri: `/users/${userId}/services/${service?.id}/products`,
      limit: "10",
      queries: `option=${initialOption}`,
      enabled: !!userId && !!initialOption,
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

  const getItemLayout = useCallback((_: any, index: number) => {
    return { length: 160, offset: 145 * index, index };
  }, []);

  const renderOption = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => (
      <Pressable
        onPress={() => {
          setInitialOption(item._id);
          ref.current?.scrollToIndex({
            index,
            animated: true,
          });
        }}
        style={{
          width: 130,
          height: 32.5,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 15,
          borderRadius: 15,
          backgroundColor: item._id === initialOption ? "#f1f1f1" : "white",
          borderWidth: 1,
          borderColor: item._id === initialOption ? "#f1f1f1" : "#ddd",
        }}
      >
        <Text
          style={{
            color: black,
            fontWeight: item._id === initialOption ? "600" : "500",
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    ),
    [initialOption]
  );

  const header = (
    <>
      <FlatList
        ref={ref}
        horizontal
        data={service.filters[0].options}
        keyExtractor={(item) => item._id}
        renderItem={renderOption}
        contentContainerStyle={styles.listHoriz}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
      />
      {products.length === 0 && (
        <NoFoundMessage
          title="Produse"
          description="Nu au fost gasite produse"
        />
      )}
    </>
  );

  return (
    <FlatList
      ListHeaderComponent={header}
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderProduct}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    />
  );
};

const styles = StyleSheet.create({
  listHoriz: {
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 215,
  },
});
