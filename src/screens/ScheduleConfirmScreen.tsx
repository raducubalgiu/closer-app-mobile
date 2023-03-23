import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Header, Button, Stack } from "../components/core";
import { useAuth, usePost } from "../hooks";
import theme from "../../assets/styles/theme";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import dayjs from "dayjs";
import { RootStackParams } from "../navigation/rootStackParams";
import { showToast } from "../utils";
import { useScheduleCounter } from "../hooks/scheduleCounter";

const { black, grey0, error, secondary } = theme.lightColors || {};
const bookableBgColor = "#f11263";
type IProps = NativeStackScreenProps<RootStackParams, "ScheduleConfirm">;

export const ScheduleConfirmScreen = ({ route }: IProps) => {
  const { user: customerId } = useAuth();
  const { serviceId, product, slot, expirationTime } = route.params;
  const { start, end, hour } = slot;
  const { ownerId, name, option, duration, description, locationId } = product;
  const { price, priceWithDiscount, discount } = product;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");
  const { increaseCounter } = useScheduleCounter();

  const { mutate, isLoading, isSuccess } = usePost({
    uri: "/schedules",
    onSuccess: () => {
      increaseCounter();
      navigation.navigate("Schedules");
    },
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const handleBook = () => {
    mutate({
      start,
      end,
      ownerId: ownerId.id,
      customerId: {
        id: customerId?.id,
        name: customerId?.name,
        username: customerId?.username,
        avatar: customerId?.avatar,
        checkmark: customerId?.checkmark,
      },
      serviceId,
      locationId,
      product: {
        id: product?.id,
        name,
        description,
        price,
        priceWithDiscount,
        discount,
        option,
        duration,
      },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("checkBookingDetails")} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {discount > 0 && (
          <Stack
            sx={{
              marginBottom: 35,
              marginTop: 5,
              backgroundColor: expirationTime ? secondary : bookableBgColor,
              padding: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {expirationTime ? t("lastMinuteOffer") : t("promotionalOffer")}
            </Text>
          </Stack>
        )}
        <Stack align="start">
          <Stack align="start" direction="row" sx={{ marginBottom: 35 }}>
            <Icon
              name="calendar"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>
                {dayjs(start).format("DD-MM-YYYY")} - {hour}
              </Text>
              <Text style={{ ...styles.description, marginTop: 5 }}>
                {ownerId?.name}
              </Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 35 }}>
            <Icon
              name="map-pin"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>Locatie</Text>
              <Text style={styles.description}>
                Strada Oarecare, nr 33, Sector 3
              </Text>
              <Text style={styles.duration}>la 5 km de tine</Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 35 }}>
            <Icon
              name="shopping-outline"
              type="material-community"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>{product.name}</Text>
              <Text style={styles.description}>
                {`Categorie: ${option.name || option}`}
              </Text>
              <Text style={styles.duration}>Durata: ~ {duration} min</Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 35 }}>
            <Icon
              name="credit-card"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>{t("payment")}</Text>
              <Text style={styles.description}>{t("paymentDetails")}</Text>
              <Stack align="start" sx={{ marginTop: 15 }}>
                {discount > 0 && (
                  <Text style={styles.price}>
                    {price} {t("lei")}
                  </Text>
                )}
                <Stack direction="row">
                  <Text style={styles.priceWithDiscount}>
                    {priceWithDiscount} {t("lei")}
                  </Text>
                  {discount > 0 && (
                    <Text style={styles.discount}>(-{discount}%)</Text>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
      <Button
        size="lg"
        title={t("confirmBooking")}
        loading={isLoading && !isSuccess}
        onPress={handleBook}
        sxBtn={{ marginHorizontal: 15 }}
        sxText={{ fontSize: 15 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    marginHorizontal: 20,
    flex: 1,
  },
  heading: {
    color: black,
    fontSize: 17,
    fontWeight: "600",
  },
  icon: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 50,
  },
  description: {
    marginTop: 5,
    color: grey0,
    fontSize: 16,
  },
  duration: { marginTop: 5, color: grey0, fontSize: 16 },
  price: {
    color: grey0,
    fontSize: 19,
    fontWeight: "500",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textTransform: "lowercase",
  },
  priceWithDiscount: {
    marginTop: 1,
    color: black,
    fontSize: 27.5,
    fontWeight: "700",
  },
  discount: {
    marginLeft: 5,
    color: error,
    fontWeight: "600",
    fontSize: 13,
  },
});
