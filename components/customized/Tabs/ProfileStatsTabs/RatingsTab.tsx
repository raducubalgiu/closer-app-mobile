import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { CardRatings } from "../../Cards/CardRatings";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";
import { useGetPaginate, useRefreshByUser } from "../../../../hooks";

const DUMMY_DATA = {
  pageParams: 1,
  pages: [
    {
      next: null,
      results: [
        {
          _id: "1",
          reviewer: {
            name: "Raducu Balgiu",
          },
          rating: 4,
          review:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
        },
      ],
    },
  ],
};

type Props = { userId: string };

export const RatingsTab = ({ userId }: Props): JSX.Element => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

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
    limit: "20",
    enabled: isFocused,
  });

  const renderRatings = useCallback(({ item }) => {
    const { reviewer, rating, review, createdAt } = item || {};

    return (
      <CardRatings
        avatar={reviewer?.avatar}
        name={reviewer?.name}
        date={createdAt}
        rating={rating}
        review={review}
        service={"Tuns"}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

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
  const { pages } = DUMMY_DATA || {};

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title={t("reviews")} description={t("noFoundReviews")} />
    );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={pages?.map((page) => page.results).flat()}
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
