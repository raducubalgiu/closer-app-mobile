import { ListRenderItemInfo, View } from "react-native";
import { memo, useCallback, useState } from "react";
import { HeaderSheet } from "../Layout/Headers/HeaderSheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { useGet } from "../../../hooks";
import { Review } from "../../../ts";
import { Spinner } from "../../core";
import { NoFoundMessage } from "../NoFoundMessage/NoFoundMessage";
import ReviewListtem from "../ListItems/ReviewListtem";

type IProps = {
  userId: string;
  name: string;
  ratingsQuantity: number;
  onClose: () => void;
};

type ReviewResponse = { results: Review[]; next: number | null };

const ReviewsSheet = ({ userId, name, ratingsQuantity, onClose }: IProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasNext, setHasNext] = useState<null | number>(null);
  const [page, setPage] = useState(1);
  const { t } = useTranslation("common");
  const insets = useSafeAreaInsets();

  const { isInitialLoading, isPreviousData, isRefetching } =
    useGet<ReviewResponse>({
      model: "reviews",
      uri: `/users/${userId}/reviews?page=${page}&limit=10`,
      options: {
        onSuccess: (response) => {
          if (response.data && response.data.next !== hasNext) {
            setHasNext(response?.data?.next);
            setReviews((reviews) => reviews.concat(response.data?.results));
          }
        },
        keepPreviousData: true,
      },
    });

  const renderReview = useCallback(({ item }: ListRenderItemInfo<Review>) => {
    return <ReviewListtem item={item} />;
  }, []);

  const keyExtractor = useCallback((item: Review) => item.id, []);

  const loadMore = () => {
    if (!!hasNext && !isPreviousData) {
      setPage((page) => page + 1);
    }
  };

  const footer = (
    <>
      {isRefetching && <Spinner sx={{ paddingVertical: 30 }} />}
      {!isRefetching && isEmpty(reviews) && (
        <NoFoundMessage
          title={t("reviews")}
          description={t("noFoundReviews")}
        />
      )}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderSheet
        title={name}
        description={`${ratingsQuantity} de recenzii`}
        onClose={onClose}
      />
      {!isInitialLoading && (
        <BottomSheetFlatList
          data={reviews}
          keyExtractor={keyExtractor}
          renderItem={renderReview}
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: insets.bottom,
          }}
          onEndReached={loadMore}
          ListFooterComponent={footer}
        />
      )}
      {isInitialLoading && <Spinner />}
    </View>
  );
};

export default memo(ReviewsSheet);
