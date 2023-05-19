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
import { memo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { CustomAvatar, IconLocation, Rating, Stack } from "../../core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Location, Option, Service } from "../../../ts";
import { Divider } from "@rneui/themed";

const { width } = Dimensions.get("window");
const { black, grey0, primary, error, success } = theme.lightColors || {};

type IProps = {
  location: Location;
  service: Service | undefined;
  option: Option | null | undefined;
};

const LocationListItem = ({ location, service, option }: IProps) => {
  const { imageCover, minPrice, distance, ownerId, address, review } = location;
  const { name, username } = ownerId;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

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

  const slots = [
    { id: "1", title: "12 Aprilie 14:00" },
    { id: "2", title: "5 Mai 09:00" },
    { id: "3", title: "10 Mai 15:00" },
    { id: "4", title: "12 Mai 16:00" },
    { id: "5", title: "30 Mai 17:00" },
    { id: "6", title: "1 Iunie 10:00" },
  ];

  type Slot = { id: string; title: string };

  const renderSlot = useCallback(
    ({ item }: ListRenderItemInfo<Slot>) => (
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: "#eee",
          paddingVertical: 7.5,
          paddingHorizontal: 15,
          borderRadius: 5,
          marginRight: 10,
        }}
      >
        <Text style={{ color: black, fontWeight: "500", fontSize: 13.5 }}>
          {item.title}
        </Text>
      </Pressable>
    ),
    []
  );

  const slotKeyExtractor = useCallback((item: Slot) => item.id, []);

  return (
    <View>
      <Pressable onPress={goToUser}>
        <Stack direction="row" align="start" sx={styles.container}>
          <Stack sx={styles.imageC}>
            <Image style={styles.image} source={{ uri: imageCover?.url }} />
          </Stack>
          <View style={styles.content}>
            <Stack align="start">
              <Text style={styles.business}>{name}</Text>
              <Text style={styles.address}>
                {trimFunc(`${address?.street}, ${address?.number}`, 30)}
              </Text>
            </Stack>
            {/* <Stack direction="row" justify="start" sx={{ marginVertical: 5 }}>
            <Text style={styles.option}>{service?.name}</Text>
            <Text style={{ ...styles.option, marginLeft: 5 }}>
              {option?.name}
            </Text>
          </Stack> */}
            <Stack direction="row" justify="start" sx={{ marginVertical: 5 }}>
              <Text style={{ color: error, fontWeight: "500" }}>Închis</Text>
              <Divider
                orientation="vertical"
                style={{ marginHorizontal: 10 }}
              />
              <Text style={{ color: grey0 }}>Deschide la 09</Text>
            </Stack>
            <Stack direction="row" justify="start">
              <Text style={styles.ratingsAverage}>
                {ownerId.ratingsAverage}
              </Text>
              <View>
                <Rating rating={ownerId.ratingsAverage} size={12.5} />
              </View>
              <Text style={styles.ratingsQuantity}>
                ({ownerId.ratingsQuantity})
              </Text>
            </Stack>
            {review.review && (
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
                  "{trimFunc(`${review?.review}`, 100)}"
                </Text>
              </Stack>
            )}
            <Stack direction="row" sx={{ marginTop: 10 }} justify="end">
              <Stack direction="row">
                <Text style={styles.from}>de la</Text>
                <Text style={styles.price}>{minPrice} Lei</Text>
              </Stack>
              <Divider
                orientation="vertical"
                style={{ marginHorizontal: 10 }}
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
      </Pressable>
      <Stack direction="row" sx={{ marginHorizontal: 15, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: "#f1f1f1",
            paddingVertical: 7.5,
            paddingHorizontal: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: black,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Liber
          </Text>
        </View>
        <Divider orientation="vertical" style={{ marginLeft: 10 }} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slots}
          keyExtractor={slotKeyExtractor}
          renderItem={renderSlot}
          contentContainerStyle={{ paddingLeft: 10 }}
        />
      </Stack>
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
    fontSize: 16,
    color: black,
    fontWeight: "600",
  },
  address: {
    color: grey0,
    marginTop: 1,
  },
  ratings: {
    marginVertical: 5,
  },
  ratingsAverage: {
    marginRight: 7.5,
    fontWeight: "600",
    fontSize: 14.5,
    color: black,
  },
  ratingsQuantity: {
    color: grey0,
    fontSize: 13.5,
    marginLeft: 5,
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
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  service: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    fontSize: 12,
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
});
