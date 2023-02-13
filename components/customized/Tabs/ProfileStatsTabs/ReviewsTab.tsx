import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, FormProvider } from "react-hook-form";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { FormInputSelect, Spinner, Stack } from "../../../core";
import {
  useGet,
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../../../hooks";
import { CardReviewSummary } from "../../Cards/CardReviewSummary";
import RatingListItem from "../../ListItems/RatingListItem";
import { Review } from "../../../../models/review";

type IProps = { userId: string };

export const ReviewsTab = ({ userId }: IProps) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const methods = useForm({ defaultValues: { productId: "" } });
  const { watch } = methods;
  const productId = watch("productId") ? watch("productId") : "";

  const { data: products } = useGet({
    model: "products",
    uri: `/users/${userId}/products/all`,
  });

  const { data: summary } = useGet({
    model: "summary",
    uri: `/users/${userId}/reviews/summary?productId=${productId}`,
  });

  const options = useGetPaginate({
    model: "ratings",
    uri: `/users/${userId}/reviews`,
    queries: `productId=${productId}`,
    limit: "10",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage, refetch } = options;
  const { data: reviews, showSpinner, loadMore } = usePaginateActions(options);

  const renderRatings = useCallback(({ item }: ListRenderItemInfo<Review>) => {
    const { id, reviewerId, productId, rating, review, createdAt, likesCount } =
      item || {};

    return (
      <RatingListItem
        id={id}
        reviewer={reviewerId}
        date={createdAt}
        rating={rating}
        review={review}
        product={productId?.name}
        likesCount={likesCount}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Review) => item?.id, []);

  const header = (
    <>
      {products?.length > 0 && (
        <Stack sx={{ marginHorizontal: 15, marginBottom: 5 }}>
          <FormProvider {...methods}>
            <FormInputSelect
              name="productId"
              items={products}
              placeholder={t("allServices")}
            />
          </FormProvider>
        </Stack>
      )}
      {!isLoading && !isFetchingNextPage && reviews?.length > 0 && (
        <CardReviewSummary
          ratings={summary?.ratings}
          ratingsQuantity={summary?.ratingsQuantity}
          ratingsAverage={summary?.ratingsAvg}
        />
      )}
      {!isLoading && !isFetchingNextPage && reviews?.length === 0 && (
        <NoFoundMessage
          title={t("reviews")}
          description={t("noFoundReviews")}
        />
      )}
    </>
  );

  const loading = isLoading && !isFetchingNextPage;

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <>
      {!loading && (
        <FlashList
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
          estimatedItemSize={100}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
