import { FlatList } from "react-native";
import { useCallback } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CardRatings } from "../../Cards/CardRatings";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";
import { useGetPaginate } from "../../../../hooks";

export const RatingsTab = ({ userId }) => {
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "ratings",
      uri: `/users/${userId}/reviews`,
      limit: "20",
    });

  const renderRatings = useCallback(({ item }) => {
    const { reviewer, rating, review, createdAt } = item || {};

    return (
      <CardRatings
        avatar={reviewer?.avatar}
        name={reviewer?.name}
        date={moment(createdAt).format("LL")}
        rating={rating}
        review={review}
        service={"Tuns"}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const noFoundMessage = (
    <NoFoundMessage title={t("reviews")} description={t("noFoundReviews")} />
  );

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

  return (
    <FlatList
      ListHeaderComponent={
        !isLoading &&
        !isFetchingNextPage &&
        pages[0]?.results?.length === 0 &&
        noFoundMessage
      }
      contentContainerStyle={{ padding: 15 }}
      data={pages?.map((page) => page.results).flat()}
      keyExtractor={keyExtractor}
      renderItem={renderRatings}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};
