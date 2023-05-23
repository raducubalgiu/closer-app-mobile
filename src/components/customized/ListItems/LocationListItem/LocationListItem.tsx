import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { memo, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../../../assets/styles/theme";
import { addMinutesFromNow, trimFunc } from "../../../../utils";
import { CustomAvatar, IconLocation, Rating, Stack } from "../../../core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { Location, Option, Period, Service } from "../../../../ts";
import { Divider, Icon } from "@rneui/themed";
import { sortBy } from "lodash";
import { AvailableSlot } from "../../../../ts/interfaces/location";
import { ListItem } from "@rneui/themed";
import AvailableSlotListItem from "./AvailableSlotListItem";
import dayjs from "dayjs";
import { trimByWord } from "../../../../utils/trimByWord";

const { width } = Dimensions.get("window");
const { black, grey0, primary, error, success } = theme.lightColors || {};

type IProps = {
  location: Location;
  service: Service | undefined;
  option: Option | null | undefined;
  period: Period | undefined;
};

const LocationListItem = ({ location, service, option, period }: IProps) => {
  const {
    imageCover,
    minPrice,
    distance,
    ownerId,
    address,
    review,
    availableSlots,
    open,
    isClosingAt,
    isOpeningAt,
  } = location;
  const { key, startDate } = period || {};
  const { name, username, id, ratingsQuantity } = ownerId;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");
  const [expanded, setExpanded] = useState(false);

  const goToUser = () => {
    if (option && service) {
      navigation.push("ProfileGeneral", {
        screen: `Products`,
        username,
        service: service?.id,
        option: option?.id,
      });
    }
  };

  const slots: AvailableSlot[] = [];

  availableSlots.forEach((arr) => {
    arr.map((el) => slots.push(el));
  });

  const sortedArr = sortBy(slots, ["start", "owner.ratingsAverage"]);

  const renderSlot = useCallback(
    ({ item }: ListRenderItemInfo<AvailableSlot>) => (
      <AvailableSlotListItem availableSlot={item} />
    ),
    []
  );

  const slotKeyExtractor = useCallback(
    (_: AvailableSlot, index: number) => index.toString(),
    []
  );

  const startsFromToday = dayjs(startDate, "YYYY-MM-DD")
    .utc(true)
    .startOf("day")
    .isSame(dayjs().utc(true).startOf("day"));

  const openingDescription = useCallback(() => {
    switch (true) {
      case !!isClosingAt:
        return t("isClosingAt", {
          IS_CLOSING_AT: addMinutesFromNow(isClosingAt),
        });
      case !!isOpeningAt:
        return t("isOpeningAt", {
          IS_OPENING_AT: addMinutesFromNow(isOpeningAt),
        });
      default:
        return "";
    }
  }, [isOpeningAt, isClosingAt]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({ length: 150, offset: 150 * index, index }),
    []
  );

  const navigateToUserReviews = () => {
    navigation.navigate("ReviewsSheet", { userId: id, name, ratingsQuantity });
  };

  return (
    <View>
      <Pressable onPress={goToUser}>
        <Stack direction="row" align="start" sx={styles.container}>
          <Stack sx={styles.imageC}>
            <Image style={styles.image} source={{ uri: imageCover?.url }} />
          </Stack>
          <View style={styles.content}>
            <View style={{ flex: 1 }}>
              <Stack align="start">
                <Text style={styles.business}>{name}</Text>
                <Text style={styles.address}>
                  {trimFunc(`${address?.street}, ${address?.number}`, 27)}
                </Text>
              </Stack>
              <Pressable onPress={() => alert("Hello World!!")}>
                {startsFromToday ? (
                  <Stack
                    direction="row"
                    justify="start"
                    sx={{ marginVertical: 7.5 }}
                  >
                    <Text
                      style={
                        open
                          ? { fontWeight: "500", color: success }
                          : { fontWeight: "500", color: error }
                      }
                    >
                      {open ? t("open") : t("closed")}
                    </Text>
                    <Divider
                      orientation="vertical"
                      style={{ marginHorizontal: 10 }}
                    />
                    <Text style={{ color: grey0 }}>{openingDescription()}</Text>
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    sx={{ marginVertical: 7.5 }}
                    justify="start"
                  >
                    <Icon
                      name="calendar"
                      type="feather"
                      color={grey0}
                      size={20}
                    />
                    <Text style={{ color: grey0, marginHorizontal: 7.5 }}>
                      Program
                    </Text>
                    <Icon name="keyboard-arrow-down" color={grey0} size={20} />
                  </Stack>
                )}
              </Pressable>
              <Pressable onPress={navigateToUserReviews}>
                <Stack direction="row" justify="start" align="center">
                  <Text style={styles.ratingsAverage}>
                    {ownerId.ratingsAverage}
                  </Text>
                  <View>
                    <Rating rating={ownerId.ratingsAverage} size={13.5} />
                  </View>
                  <Text style={styles.ratingsQuantity}>
                    ({ownerId.ratingsQuantity})
                  </Text>
                </Stack>
                {review?.review && (
                  <Stack direction="row" align="start" sx={{ marginTop: 7.5 }}>
                    <CustomAvatar
                      avatar={review.reviewerId.avatar}
                      size={20}
                      sx={{ borderWidth: 1.5, borderColor: primary }}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        color: grey0,
                        flex: 1,
                        fontStyle: "italic",
                      }}
                    >
                      {trimByWord(`${review?.review}`, 10)}
                    </Text>
                  </Stack>
                )}
              </Pressable>
            </View>
            <Stack direction="row" sx={{ marginTop: 10 }} justify="end">
              <Stack direction="row">
                <Text style={styles.from}>de la</Text>
                <Text style={styles.price}>{minPrice} Lei</Text>
                <Text
                  style={{
                    fontSize: 11.5,
                    color: error,
                    marginLeft: 5,
                    fontWeight: "500",
                  }}
                >
                  (-10%)
                </Text>
              </Stack>
              <Divider
                orientation="vertical"
                style={{ marginHorizontal: 7.5 }}
                color="#ddd"
              />
              <Stack direction="row">
                <Stack direction="row">
                  <IconLocation size={15} />
                  <Text style={styles.distance}>la {distance} km</Text>
                </Stack>
              </Stack>
            </Stack>
          </View>
        </Stack>
        <ListItem.Accordion
          containerStyle={{
            marginTop: 15,
            marginHorizontal: 15,
            paddingHorizontal: 5,
            paddingTop: 5,
            paddingBottom: 7.5,
            justifyContent: "center",
            borderTopWidth: 1,
            borderTopColor: "#eee",
            borderBottomWidth: 1,
            borderBottomColor: expanded ? "transparent" : "#eee",
          }}
          leftRotate={true}
          content={
            <ListItem.Content>
              <ListItem.Title
                style={{ fontSize: 14.5, fontWeight: "500", color: black }}
              >
                {t("availableSeats")}
              </ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => setExpanded((expanded) => !expanded)}
        >
          <Stack direction="row" justify="start" sx={{ marginTop: 15 }}>
            <Pressable
              style={{
                height: 35,
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#eee",
                marginLeft: 15,
                marginRight: 10,
              }}
            >
              <Stack direction="row">
                <Icon
                  name="calendar"
                  type="feather"
                  size={20}
                  style={{ marginRight: 5 }}
                />
                <Icon name="keyboard-arrow-down" />
              </Stack>
            </Pressable>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={sortedArr}
              keyExtractor={slotKeyExtractor}
              renderItem={renderSlot}
              getItemLayout={getItemLayout}
            />
          </Stack>
        </ListItem.Accordion>
      </Pressable>
    </View>
  );
};

export default memo(LocationListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  imageC: {
    width: width / 3.25,
    height: 150,
    backgroundColor: "#ddd",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius: 2.5,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  business: {
    fontSize: 16.5,
    color: black,
    fontWeight: "600",
  },
  address: {
    color: grey0,
    marginTop: 1,
  },
  ratingsAverage: {
    marginRight: 10,
    fontWeight: "600",
    fontSize: 14.5,
    color: black,
  },
  ratingsQuantity: {
    color: grey0,
    fontSize: 13.5,
    marginLeft: 2,
  },
  option: {
    fontWeight: "500",
    marginTop: 2.5,
    padding: 5,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  price: {
    fontSize: 15.5,
    marginLeft: 5,
    fontWeight: "600",
    color: black,
    textTransform: "lowercase",
  },
  from: {
    fontSize: 12,
  },
  warning: {
    marginTop: 5,
    fontSize: 13,
  },
  distance: {
    marginLeft: 2.5,
    fontSize: 13,
    color: black,
    fontWeight: "600",
  },
  horizFlatlist: {
    paddingHorizontal: 15,
  },
});
