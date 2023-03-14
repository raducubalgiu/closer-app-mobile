import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { StyleSheet, RefreshControl, Text } from "react-native";
import { useCallback } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import theme from "../../assets/styles/theme";
import { Header, Spinner, Stack } from "../components/core";
import { NoFoundMessage, CardReviewSummary } from "../components/customized";
import RatingListItem from "../components/customized/ListItems/RatingListItem";
import { useGet, useGetPaginate, useRefreshByUser } from "../hooks";
import { Review } from "../models/review";
import { RootStackParams } from "../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "ProductReviews">;
const { black, grey0 } = theme.lightColors || {};

export const ProductReviewsScreen = ({ route }: IProps) => {
  const { productId, productName, ownerId } = route.params;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { data: summary } = useGet({
    model: "summary",
    uri: `/users/${ownerId}/reviews/summary?productId=${productId}`,
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
    uri: `/products/${productId}/reviews`,
    limit: "10",
  });

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
  const reviews = pages?.map((page) => page.results).flat() || [];

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const header = (
    <>
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

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={
          <Stack>
            <Text style={styles.title}>{t("reviews")}</Text>
            <Text style={styles.description}>{productName}</Text>
          </Stack>
        }
      />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  title: { color: grey0, fontWeight: "600", fontSize: 16 },
  description: { color: black, fontWeight: "500", fontSize: 16 },
});
