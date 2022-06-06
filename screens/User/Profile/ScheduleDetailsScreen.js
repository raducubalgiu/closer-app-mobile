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
} from "../../../components/core";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/base";
import theme from "../../../assets/styles/theme";
import moment from "moment";
import { Divider } from "@rneui/themed";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AddressFormat } from "../../../utils";
import axios from "axios";
import { useAuth } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";

const { black, grey0, success, error } = theme.lightColors;

const ScheduleDetailsScreen = ({ route }) => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [schedule, setSchedule] = useState(route.params.schedule);
  const { owner, product, scheduleStart, service, status, _id } = schedule;
  const { coordinates } = owner.location;
  const formatScheduleStart = moment(scheduleStart).utc().format("lll");
  const { t } = useTranslation();
  const navigation = useNavigation();

  const cancelAppoinment = () => {
    if (moment(scheduleStart).isAfter(moment())) {
      axios
        .patch(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/schedules/${_id}`,
          { status: "canceled" },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          const { status } = res.data.schedule;
          setSchedule({ ...schedule, status });
          setFeedback({
            visible: true,
            message: "Ai anulat rezervarea cu success!",
          });
        })
        .catch(() =>
          setFeedback({ visible: true, message: t("somethingWentWrong") })
        );
    } else {
      setFeedback({
        visible: true,
        message: "You cannot cancel the appoinment anymore",
      });
    }
  };

  const goToOwner = () =>
    navigation.push("ProfileGeneral", {
      userId: owner?._id,
      username: owner?.username,
      name: owner?.name,
    });

  let actionButton;

  if (moment(scheduleStart).isAfter(moment().utc()) && status === "accepted") {
    actionButton = (
      <MainButton
        onPress={cancelAppoinment}
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
        onPress={() => {}}
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
              <Text style={styles.service}>{service.name}</Text>
            </Stack>
            <Divider color="#ddd" style={styles.divider} />
            <Stack direction="row" align="start">
              <Stack align="start" sx={{ flex: 1 }}>
                <Text style={styles.product}>{product.name}</Text>
                <Stack direction="row" sx={{ marginVertical: 7.5 }}>
                  <Icon name="clock" type="feather" color={black} size={20} />
                  <Text style={styles.duration}>{product.duration} min</Text>
                </Stack>
              </Stack>
              <Stack align="end">
                <Text style={styles.price}>
                  {product.price} {t("ron")}
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
              image={require("../../../assets/images/map_marker.png")}
            ></Marker>
          </MapView>
          <Button onPress={goToOwner}>
            <Stack
              direction="row"
              justify="start"
              sx={{ paddingHorizontal: 15 }}
            >
              <CustomAvatar avatar={owner.avatar} size={30} iconSize={15} />
              <Text style={styles.owner}>{owner.name}</Text>
            </Stack>
          </Button>
          <Divider style={styles.divider} />
          <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
            <IconLocation size={22} color={black} />
            <Text style={styles.address}>{AddressFormat(owner.location)}</Text>
          </Stack>
          <Stack align="start" sx={{ marginLeft: 15 }}>
            <MainButton
              title={
                <Stack direction="row">
                  <Icon name="navigation" type="feather" size={20} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "Exo-SemiBold",
                      color: black,
                      fontSize: 15,
                    }}
                  >
                    {t("navigate")}
                  </Text>
                </Stack>
              }
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

export default ScheduleDetailsScreen;

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
    fontFamily: "Exo-SemiBold",
    fontSize: 15.5,
    color: black,
  },
  service: {
    color: grey0,
    fontSize: 14,
    fontFamily: "Exo-Medium",
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
    fontFamily: "Exo-Medium",
    fontSize: 15,
    marginBottom: 5,
  },
  product: { fontFamily: "Exo-Medium", color: black, fontSize: 17 },
  price: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 15,
    flex: 1,
  },
  duration: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 5,
    fontFamily: "Exo-Regular",
  },
  owner: {
    fontFamily: "Exo-Medium",
    fontSize: 16,
    color: black,
    marginLeft: 10,
  },
  address: {
    color: grey0,
    fontSize: 14.5,
    fontFamily: "Exo-Regular",
    marginLeft: 10,
  },
  map: { height: 200, width: "100%", marginVertical: 20 },
});
