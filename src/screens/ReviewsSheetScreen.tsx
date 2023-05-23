import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useCallback } from "react";
import { HeaderSheet } from "../components/customized";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
} from "../hooks";
import { Review } from "../ts";
import { NoFoundMessage } from "../components/customized";
import { ReviewListtem } from "../components/customized";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";

type IProps = NativeStackScreenProps<RootStackParams, "ReviewsSheet">;

export const ReviewsSheetScreen = ({ route }: IProps) => {
  const { userId, name, ratingsQuantity } = route.params;
  const { t } = useTranslation("common");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const options = useGetPaginate({
    model: "reviews",
    uri: `/users/${userId}/reviews`,
    limit: "10",
  });

  const { refetch } = options;
  const { data: reviews, loadMore, showSpinner } = usePaginateActions(options);

  useRefreshOnFocus(refetch);

  const renderReview = useCallback(({ item }: ListRenderItemInfo<Review>) => {
    return <ReviewListtem item={item} />;
  }, []);

  const keyExtractor = useCallback((item: Review) => item.id, []);

  const header = (
    <>
      {isEmpty(reviews) && (
        <NoFoundMessage
          title={t("reviews")}
          description={t("noFoundReviews")}
        />
      )}
    </>
  );

  return (
    <View style={{ ...styles.screen, height: height - 160 }}>
      <HeaderSheet
        title={name}
        description={`${ratingsQuantity} de recenzii`}
        onClose={() => navigation.goBack()}
      />
      <FlatList
        data={reviews}
        ListHeaderComponent={header}
        keyExtractor={keyExtractor}
        renderItem={renderReview}
        contentContainerStyle={{
          paddingTop: 15,
          paddingBottom: insets.bottom,
        }}
        onEndReached={loadMore}
        ListFooterComponent={showSpinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
