import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import {
  Header,
  Stack,
  IconLocation,
  IconStar,
  Button,
  Protected,
} from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/base";
import theme from "../assets/styles/theme";
import { Divider } from "@rneui/themed";
import { AddressFormat, showToast } from "../utils";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useAuth, useGet } from "../hooks";
import MapStatic from "../components/customized/Map/MapStatic";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { SECOND_ROLE, THIRD_ROLE } from "@env";

const { black, grey0, success, error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ScheduleDetails">;

export const ScheduleDetailsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const {
    _id,
    ownerId,
    product,
    start,
    serviceId,
    status,
    locationId,
    customerId,
  } = route.params.schedule;
  const { name, username, avatar, checkmark } = ownerId;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data } = useGet({
    model: "location",
    uri: `/users/${ownerId?.id}/locations/${locationId}`,
    onError: () =>
      showToast({ message: "Nu au fost obtinute detaliile despre locatie" }),
  });

  const { address } = data || {};

  const goToOwner = () =>
    navigation.push("ProfileGeneral", {
      userId: ownerId.id,
      username,
      name,
      avatar,
      checkmark,
      service: null,
      option: null,
    });

  const goToCancel = () =>
    navigation.navigate("ScheduleCancel", { scheduleId: _id });

  const goToBookAgain = () =>
    navigation.navigate("CalendarBig", { product, serviceId });

  let actionButton;

  if (dayjs(start).isAfter(dayjs().utc()) && status === "accepted") {
    actionButton = (
      <Button
        onPress={goToCancel}
        title={t("cancelAppoinment")}
        size="lg"
        radius={25}
        bgColor={error}
        sxBtn={{ margin: 15 }}
      />
    );
  } else {
    actionButton = (
      <Protected userRole={user?.role} roles={[THIRD_ROLE, SECOND_ROLE]}>
        <Button
          onPress={goToBookAgain}
          title={t("bookAgain")}
          size="lg"
          radius={25}
          bgColor={"#eee"}
          color={black}
          sxBtn={{ margin: 15 }}
        />
      </Protected>
    );
  }

  let statusColor =
    status === "canceled" ? { color: "#F72A50" } : { color: success };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header
          title=""
          actionBtn={<Icon name="send" type="feather" color={black} />}
        />
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
            <Text style={{ ...styles.status, ...statusColor }}>{status}</Text>
            <Stack direction="row" justify="start">
              <Text style={styles.date}>
                {dayjs(start).utc().format("DD MMMM YYYY, HH:mm")}
              </Text>
              <Text style={styles.service}>{serviceId?.name}</Text>
            </Stack>
            <Divider color="#ddd" style={styles.divider} />
            <Stack direction="row" align="start">
              <Stack align="start" sx={{ flex: 1 }}>
                <Text style={styles.product}>{product?.name}</Text>
                <Stack direction="row" sx={{ marginVertical: 7.5 }}>
                  <Icon name="clock" type="feather" color={black} size={20} />
                  <Text style={styles.duration}>{product?.duration} min</Text>
                </Stack>
              </Stack>
              <Stack align="end">
                <Text style={styles.price}>
                  {product?.price} {t("ron")}
                </Text>
              </Stack>
            </Stack>
          </View>
          <Pressable onPress={goToOwner} style={styles.userCont}>
            <Stack direction="row" justify="start">
              <CustomAvatar
                avatar={
                  user?.role !== "subscriber"
                    ? customerId?.avatar
                    : ownerId?.avatar
                }
                size={40}
              />
              <Stack align="start" sx={{ marginLeft: 10 }}>
                <Text style={styles.name}>
                  {user?.role !== "subscriber"
                    ? customerId?.name
                    : ownerId?.name}
                </Text>
                {user?.role === THIRD_ROLE && (
                  <Stack direction="row" align="start">
                    <IconStar />
                    <Text style={styles.rating}>4.5</Text>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Pressable>
          {actionButton}
          <Protected userRole={user?.role} roles={[SECOND_ROLE, THIRD_ROLE]}>
            {address && (
              <MapStatic
                latitude={address.coordinates[0]}
                longitude={address.coordinates[1]}
                sx={{ marginVertical: 20 }}
              />
            )}
            <Stack
              direction="row"
              justify="start"
              sx={{ marginHorizontal: 15 }}
            >
              <IconLocation size={22} color={black} />
              <Text style={styles.address}>{AddressFormat(address)}</Text>
            </Stack>
          </Protected>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  date: {
    fontSize: 15.5,
    color: black,
    fontWeight: "500",
  },
  service: {
    color: grey0,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  divider: { marginTop: 20, marginBottom: 10 },
  status: {
    textTransform: "uppercase",
    fontSize: 15,
    marginBottom: 5,
  },
  product: { color: black, fontSize: 17, fontWeight: "500" },
  price: {
    color: black,
    fontSize: 16,
    flex: 1,
    fontWeight: "700",
  },
  duration: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 5,
  },
  userCont: { padding: 15 },
  name: {
    fontSize: 16,
    color: black,
    fontWeight: "600",
    marginBottom: 2.5,
  },
  rating: { fontWeight: "600", marginLeft: 2.5 },
  address: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 10,
    flex: 1,
  },
  navigate: {
    marginLeft: 10,
    color: black,
    fontSize: 15,
  },
  navigateBtn: {
    marginTop: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    paddingHorizontal: 12.5,
  },
});
