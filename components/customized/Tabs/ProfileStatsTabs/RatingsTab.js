import { FlatList, View, StyleSheet } from "react-native";
import { useCallback } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CardRatings } from "../../Cards/CardRatings";
import { useHttpGet } from "../../../../hooks";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";

export const RatingsTab = ({ userId }) => {
  const { t } = useTranslation();

  const { data: reviews, loading } = useHttpGet(`/users/${userId}/reviews`);

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

  const noFoundMessage = (
    <NoFoundMessage title={t("reviews")} description={t("noFoundReviews")} />
  );

  return (
    <View style={styles.screen}>
      {!loading && (
        <FlatList
          data={reviews}
          keyExtractor={keyExtractor}
          renderItem={renderRatings}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={!loading && !reviews?.length && noFoundMessage}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
