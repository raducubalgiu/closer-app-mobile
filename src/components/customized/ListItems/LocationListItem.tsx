import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { memo } from "react";
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
const { black, grey0, primary } = theme.lightColors || {};

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

  return (
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
          <Stack direction="row" justify="start" sx={{ marginVertical: 5 }}>
            <Text style={styles.option}>{service?.name}</Text>
            <Text style={{ ...styles.option, marginLeft: 5 }}>
              {option?.name}
            </Text>
          </Stack>
          <Stack direction="row" justify="start">
            <Text style={styles.ratingsAverage}>{ownerId.ratingsAverage}</Text>
            <View>
              <Rating rating={ownerId.ratingsAverage} size={12.5} />
            </View>
            <Text style={styles.ratingsQuantity}>
              ({ownerId.ratingsQuantity})
            </Text>
          </Stack>
          {review.review && (
            <Stack direction="row" sx={{ marginTop: 7.5 }}>
              <CustomAvatar
                avatar={review.reviewerId.avatar}
                size={20}
                sx={{ borderWidth: 1.5, borderColor: primary }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: black,
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
    borderRadius: 7.5,
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
