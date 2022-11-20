import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import {
  CustomAvatar,
  Header,
  MainButton,
  Stack,
  IconLocation,
  IconStar,
} from "../components/core";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/base";
import theme from "../assets/styles/theme";
import { Divider } from "@rneui/themed";
import { AddressFormat } from "../utils";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useGet } from "../hooks";
import { MapStatic } from "../components/customized";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

const { black, grey0, success, error } = theme.lightColors;

export const ScheduleDetailsScreen = ({ route }) => {
  const { user, product, start, service, status, _id, location } =
    route.params.schedule;
  const { name, username, avatar, checkmark } = user;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data } = useGet({
    model: "location",
    uri: `/users/${user._id}/locations/${location}`,
  });

  const { address } = data || {};

  const goToOwner = () =>
    navigation.push("ProfileGeneral", {
      userId: user._id,
      username,
      name,
      avatar,
      checkmark,
      service: null,
      option: null,
    });
  const goToCancel = () =>
    navigation.navigate("ScheduleCancel", {
      start,
      scheduleId: _id,
    });
  const goToBookAgain = () =>
    navigation.navigate("CalendarBig", { product, service });

  let actionButton;

  if (dayjs(start).isAfter(dayjs().utc()) && status === "accepted") {
    actionButton = (
      <MainButton
        onPress={goToCancel}
        title={t("cancelAppoinment")}
        size="lg"
        radius={25}
        bgColor={error}
        sx={styles.btn}
      />
    );
  } else {
    actionButton = (
      <MainButton
        onPress={goToBookAgain}
        title={t("bookAgain")}
        size="lg"
        radius={25}
        bgColor={"#eee"}
        txtColor={black}
        sx={styles.btn}
      />
    );
  }

  let statusColor =
    status === "canceled" ? { color: "#F72A50" } : { color: success };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header actionBtn={<Icon name="send" type="feather" color={black} />} />
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <View style={{ padding: 15 }}>
            <Text style={{ ...styles.status, ...statusColor }}>{status}</Text>
            <Stack direction="row" justify="start">
              <Text style={styles.date}>
                {dayjs(start).format("DD MMMM YY, HH:MM")}
              </Text>
              <Text style={styles.service}>{service?.name}</Text>
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
          {actionButton}
          {address && (
            <View>
              <MapStatic
                latitude={address.coordinates[0]}
                longitude={address.coordinates[1]}
                sx={{ marginVertical: 20 }}
              />
              <Stack
                align="start"
                sx={{ position: "absolute", bottom: 30, right: 15 }}
              >
                <MainButton
                  onPress={() => {}}
                  title={<Text style={styles.navigate}>{t("navigate")}</Text>}
                  bgColor="white"
                  radius={25}
                  sx={{
                    marginTop: 20,
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 20,
                  }}
                />
              </Stack>
            </View>
          )}
          <Pressable onPress={goToOwner} style={styles.userCont}>
            <Stack direction="row" justify="start">
              <CustomAvatar avatar={user?.avatar} size={40} iconSize={20} />
              <Stack align="start" sx={{ marginLeft: 10 }}>
                <Text style={styles.name}>{user?.name}</Text>
                <Stack direction="row" align="start">
                  <IconStar />
                  <Text style={styles.rating}>4.5</Text>
                </Stack>
              </Stack>
            </Stack>
          </Pressable>
          <Divider style={styles.divider} />
          <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
            <IconLocation size={22} color={black} />
            <Text style={styles.address}>{AddressFormat(address)}</Text>
          </Stack>
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
  btn: {
    marginHorizontal: 15,
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
  userCont: { paddingHorizontal: 15, paddingVertical: 10 },
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
  },
  navigate: {
    marginLeft: 10,
    color: black,
    fontSize: 15,
  },
});
