import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { InputSelect, Spinner, Stack } from "../../../core";
import { useGet, useGetPaginate, useRefreshByUser } from "../../../../hooks";
import { CardReviewSummary } from "../../Cards/CardReviewSummary";
import RatingListItem from "../../ListItems/RatingListItem";
import { Review } from "../../../../models/review";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = { userId: string };

export const RatingsTab = ({ userId }: IProps) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const { data: summary } = useGet({
    model: "summary",
    uri: `/users/${userId}/reviews/summary`,
  });

  const { data: products } = useGet({
    model: "products",
    uri: `/users/${userId}/products`,
  });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "ratings",
    uri: `/users/${userId}/reviews`,
    limit: "10",
    enabled: isFocused,
  });

  const renderRatings = useCallback(({ item }: ListRenderItemInfo<Review>) => {
    const { reviewerId, productId, rating, review, createdAt, likesCount } =
      item || {};

    return (
      <RatingListItem
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

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };
  const { pages } = data || {};
  const reviews = pages?.map((page) => page.results).flat();

  const header = (
    <>
      <Stack sx={{ marginHorizontal: 15, marginBottom: 15 }}>
        <InputSelect
          items={[products]}
          placeholder="Toate serviciile"
          value="1"
          onValueChange={() => {}}
        />
      </Stack>
      <CardReviewSummary summary={summary} ratingsQuantity={8} />
      {!isLoading && !isFetchingNextPage && reviews?.length === 0 && (
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
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: insets.bottom }}
        data={reviews}
        keyExtractor={keyExtractor}
        renderItem={renderRatings}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={100}
      />
    </>
  );
};
