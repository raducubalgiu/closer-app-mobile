import { StyleSheet, Text, View } from "react-native";
import { find } from "lodash";
import { ListItem, Rating, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { memo } from "react";

const { primary, black, grey0 } = theme.lightColors || {};

type RatingItemProps = { count: number; defRating: number; percentage: string };

const RatingItem = ({ count, defRating, percentage }: RatingItemProps) => {
  const styles = StyleSheet.create({
    barContainer: {
      flex: 1,
      backgroundColor: "#ddd",
      width: "100%",
      height: 10,
      marginHorizontal: 15,
    },
    barProgress: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: primary,
      width: percentage,
      height: 10,
    },
    reviewCount: { color: grey0, fontWeight: "600" },
  });

  return (
    <ListItem align="center" between>
      <Rating rating={defRating} sx={{ marginVertical: 0 }} />
      <View style={styles.barContainer}>
        <View style={styles.barProgress} />
      </View>
      <Stack align="center" justify="center" sx={{ width: 20, height: 20 }}>
        <Text style={styles.reviewCount}>{count}</Text>
      </Stack>
    </ListItem>
  );
};

type IProps = { ratings: any; ratingsQuantity: number; ratingsAverage: number };

const CardReviewSummary = ({
  ratings,
  ratingsQuantity = 0,
  ratingsAverage = 0,
}: IProps) => {
  const getPercentage = (quantity: number, count: number) => {
    return `${(count / quantity) * 100}%`;
  };
  const displayCount = (ratings: any, defRating: number) => {
    const el = find(ratings, { _id: defRating });
    if (el) {
      return el.count;
    } else {
      return 0;
    }
  };

  return (
    <Stack direction="row" justify="start" sx={styles.container}>
      <Stack sx={styles.ratingAvg}>
        <Text style={styles.ratingAvgTxt}>{ratingsAverage}</Text>
      </Stack>
      <Stack sx={{ flex: 1 }}>
        <RatingItem
          defRating={5}
          count={displayCount(ratings, 5)}
          percentage={getPercentage(ratingsQuantity, displayCount(ratings, 5))}
        />
        <RatingItem
          defRating={4}
          count={displayCount(ratings, 4)}
          percentage={getPercentage(ratingsQuantity, displayCount(ratings, 4))}
        />
        <RatingItem
          defRating={3}
          count={displayCount(ratings, 3)}
          percentage={getPercentage(ratingsQuantity, displayCount(ratings, 3))}
        />
        <RatingItem
          defRating={2}
          count={displayCount(ratings, 2)}
          percentage={getPercentage(ratingsQuantity, displayCount(ratings, 2))}
        />
        <RatingItem
          defRating={1}
          count={displayCount(ratings, 1)}
          percentage={getPercentage(ratingsQuantity, displayCount(ratings, 1))}
        />
      </Stack>
    </Stack>
  );
};

export default memo(CardReviewSummary);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  ratingAvg: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 15,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2.5,
  },
  ratingAvgTxt: { color: black, fontSize: 16, fontWeight: "700" },
});
