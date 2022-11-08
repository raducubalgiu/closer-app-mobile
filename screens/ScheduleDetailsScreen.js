import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  CustomAvatar,
  Header,
  MainButton,
  Stack,
  IconLocation,
  Feedback,
  Button,
} from "../components/core";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/base";
import theme from "../assets/styles/theme";
import moment from "moment";
import { Divider } from "@rneui/themed";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AddressFormat } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useHttpGet } from "../hooks";

const { black, grey0, success, error } = theme.lightColors;

export const ScheduleDetailsScreen = ({ route }) => {
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { scheduleId, location } = route.params;
  const { coordinates } = location;
  const formatScheduleStart = moment(scheduleStart).utc().format("lll");
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { data: schedule } = useHttpGet(`/schedules/${scheduleId}`);
  const { owner, product, scheduleStart, service, status, _id, employee } =
    schedule || {};

  const goToOwner = () =>
    navigation.push("ProfileGeneral", {
      userId: owner?._id,
      username: owner?.username,
      name: owner?.name,
    });
  const goToCancel = () =>
    navigation.navigate("ScheduleCancel", {
      scheduleStart,
      scheduleId: _id,
    });
  const goToBookAgain = () =>
    navigation.navigate("CalendarBig", {
      product,
      service,
      owner,
      employee,
      opening_hours: owner.opening_hours,
    });

  let actionButton;

  if (moment(scheduleStart).isAfter(moment().utc()) && status === "accepted") {
    actionButton = (
      <MainButton
        onPress={goToCancel}
        title={t("cancelAppoinment")}
        fullwidth
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
        fullwidth
        size="lg"
        radius={25}
        bgColor={"#eee"}
        txtColor={black}
        sx={styles.btn}
      />
    );
  }

  const initialRegion = {
    latitude: 44.425625,
    longitude: 26.102312,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let statusColor =
    status === "canceled" ? { color: "#F72A50" } : { color: success };

  return (
    <SafeAreaView style={styles.screen}>
      <Header actionBtn={<Icon name="send" type="feather" color={black} />} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <ScrollView style={styles.container}>
        <View>
          <View style={{ padding: 15 }}>
            <Text style={{ ...styles.status, ...statusColor }}>{status}</Text>
            <Stack direction="row" justify="start">
              <Text style={styles.date}>{formatScheduleStart}</Text>
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
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{
                latitude: coordinates[0],
                longitude: coordinates[1],
              }}
              image={require("../assets/images/map_marker.png")}
            ></Marker>
          </MapView>
          <Button onPress={goToOwner}>
            <Stack
              direction="row"
              justify="start"
              sx={{ paddingHorizontal: 15 }}
            >
              <CustomAvatar avatar={owner?.avatar} size={30} iconSize={15} />
              <Text style={styles.owner}>{owner?.name}</Text>
            </Stack>
          </Button>
          <Divider style={styles.divider} />
          <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
            <IconLocation size={22} color={black} />
            <Text style={styles.address}>{AddressFormat(owner?.location)}</Text>
          </Stack>
          <Stack align="start" sx={{ marginLeft: 15 }}>
            <MainButton
              title={<Text style={styles.navigate}>{t("navigate")}</Text>}
              bgColor="#f5f5f5"
              radius={25}
              sx={{ marginTop: 10 }}
            />
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  product: { color: black, fontSize: 17 },
  price: {
    color: black,
    fontSize: 15,
    flex: 1,
  },
  duration: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 5,
  },
  owner: {
    fontSize: 16,
    color: black,
    marginLeft: 10,
  },
  address: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 10,
  },
  map: { height: 200, width: "100%", marginVertical: 20 },
  navigate: {
    marginLeft: 10,
    color: black,
    fontSize: 15,
  },
});
