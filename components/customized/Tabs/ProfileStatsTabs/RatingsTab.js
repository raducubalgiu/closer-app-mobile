import { FlatList } from "react-native";
import { useCallback } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CardRatings } from "../../Cards/CardRatings";
import { useHttpGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const RatingsTab = ({ userId }) => {
  const { t } = useTranslation();

  const { data: reviews } = useHttpGet(`/users/${userId}/reviews`);

  const renderRatings = useCallback(({ item }) => {
    const { reviewer, rating, review, createdAt } = item;

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

  return (
    <>
      {reviews?.length === 0 && (
        <NoFoundMessage
          title={t("reviews")}
          description={t("noFoundReviews")}
        />
      )}
      <FlatList
        data={reviews}
        keyExtractor={keyExtractor}
        renderItem={renderRatings}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};
