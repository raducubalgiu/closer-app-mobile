import {
  RefreshControl,
  Text,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { Spinner, Stack } from "../../../core";
import {
  useGet,
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../../../hooks";
import { CardReviewSummary } from "../../Cards/CardReviewSummary";
import RatingListItem from "../../ListItems/RatingListItem";
import { Review, Product } from "../../../../ts";
import { Divider, Icon, ListItem } from "@rneui/themed";
import theme from "../../../../../assets/styles/theme";

type IProps = { userId: string };
const { black, success } = theme.lightColors || {};

export const ReviewsTab = ({ userId }: IProps) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expanded, setExpanded] = useState(false);

  const { data: products } = useGet({
    model: "products",
    uri: `/users/${userId}/products/all`,
  });

  const { data: summary } = useGet({
    model: "summary",
    uri: `/users/${userId}/reviews/summary?productId=${
      selectedProduct ? selectedProduct?.id : ""
    }`,
  });

  const options = useGetPaginate({
    model: "ratings",
    uri: `/users/${userId}/reviews`,
    queries: `productId=${selectedProduct ? selectedProduct?.id : ""}`,
    limit: "10",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage, refetch } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: reviews, showSpinner, loadMore } = usePaginateActions(options);

  const renderRatings = useCallback(({ item }: ListRenderItemInfo<Review>) => {
    const {
      id,
      reviewerId,
      serviceId,
      productId,
      rating,
      review,
      createdAt,
      likesCount,
    } = item || {};

    return (
      <RatingListItem
        id={id}
        reviewer={reviewerId}
        date={createdAt}
        rating={rating}
        review={review}
        product={productId?.name}
        service={serviceId?.name}
        likesCount={likesCount}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Review) => item?.id, []);

  const onHandleProduct = (prod: Product | null) => {
    setSelectedProduct(prod);
    setExpanded(false);
  };

  const accordionTitle = (
    <ListItem.Content>
      <Text style={{ fontWeight: "600", color: black }}>
        {selectedProduct ? selectedProduct?.name : t("allServices")}
      </Text>
    </ListItem.Content>
  );

  const header = (
    <>
      {reviews?.length > 0 && (
        <ListItem.Accordion
          content={accordionTitle}
          onPress={() => setExpanded((expanded) => !expanded)}
          isExpanded={expanded}
          containerStyle={styles.accordion}
        >
          <ScrollView style={styles.accordionList}>
            <Pressable onPress={() => onHandleProduct(null)}>
              <Stack direction="row" sx={{ padding: 15 }}>
                <Text style={{ color: black, fontWeight: "500" }}>
                  {t("allServices")}
                </Text>
                {!selectedProduct && (
                  <Icon name="check" type="feather" color={success} size={20} />
                )}
              </Stack>
              <Divider color="#ddd" />
            </Pressable>
            {products?.map((prod: Product, i: number) => {
              return (
                <Pressable key={i} onPress={() => onHandleProduct(prod)}>
                  <Stack direction="row" sx={{ padding: 15 }}>
                    <Text style={{ color: black, fontWeight: "500" }}>
                      {prod.name}
                    </Text>
                    {selectedProduct?.id === prod?.id && (
                      <Icon
                        name="check"
                        type="feather"
                        color={success}
                        size={20}
                      />
                    )}
                  </Stack>
                  <Divider color="#ddd" />
                </Pressable>
              );
            })}
          </ScrollView>
        </ListItem.Accordion>
      )}
      {!expanded && !loading && reviews?.length > 0 && (
        <CardReviewSummary
          ratings={summary?.ratings}
          ratingsQuantity={summary?.ratingsQuantity}
          ratingsAverage={summary?.ratingsAvg}
        />
      )}
      {!loading && reviews?.length === 0 && (
        <NoFoundMessage
          title={t("reviews")}
          description={t("noFoundReviews")}
        />
      )}
    </>
  );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <>
      {!loading && (
        <FlatList
          ListHeaderComponent={header}
          refreshControl={refreshControl}
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: insets.bottom,
          }}
          data={reviews}
          keyExtractor={keyExtractor}
          renderItem={renderRatings}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({
  accordion: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 15,
    borderRadius: 2.5,
    paddingVertical: 10,
    marginTop: 0,
  },
  accordionList: {
    height: 200,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: "#ddd",
    borderBottomColor: "#ddd",
    borderRightColor: "#ddd",
    marginHorizontal: 15,
    borderRadius: 2.5,
    flex: 1,
  },
});
