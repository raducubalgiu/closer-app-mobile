import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { Divider, Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import {
  Header,
  Heading,
  ListItem,
  Spinner,
  Stack,
} from "../../../../components/core";
import theme from "../../../../../assets/styles/theme";
import { useAuth, useGet } from "../../../../hooks";
import { numberWithComma } from "../../../../utils";

type IProps = NativeStackScreenProps<RootStackParams, "MyCalendarStatistics">;
const { success, black, grey0 } = theme.lightColors || {};

const ItemList = ({
  title,
  counter,
  bold,
}: {
  title: string;
  counter: any;
  bold?: boolean;
}) => {
  return (
    <ListItem between sx={styles.listItem}>
      <Text
        style={
          !bold
            ? { ...styles.statusLabel }
            : { ...styles.statusLabel, fontWeight: "600" }
        }
      >
        {title}
      </Text>
      <Text style={styles.status}>{counter}</Text>
    </ListItem>
  );
};

const ItemSummary = ({
  counter,
  bgColor,
  title,
}: {
  counter: any;
  bgColor: any;
  title: string;
}) => {
  return (
    <Stack>
      <Text style={styles.counter}>{counter}</Text>
      <Stack direction="row" sx={{ marginTop: 12.5 }}>
        <View style={{ ...styles.bullet, backgroundColor: bgColor }} />
        <Text style={styles.label}>{title}</Text>
      </Stack>
    </Stack>
  );
};

export const MyCalendarStatisticsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { day } = route.params;
  const { t } = useTranslation("common");
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(
    ["1%", 200],
    <Stack align="center" sx={{ flex: 1, padding: 20, marginTop: 10 }}>
      <Stack>
        <Text style={styles.headingSheet}>{t("sales")}</Text>
        <Text style={{ color: grey0, textAlign: "center" }}>
          {t("salesAreCalculatedFinalized")}
        </Text>
      </Stack>
    </Stack>
  );

  const { data, isLoading, isFetching } = useGet({
    model: "calendarStatistics",
    uri: `/users/${user?.id}/schedules/calendar/statistics?day=${day}`,
  });

  const { newClients, ownClients, closerClients } = data?.statistics || {};
  const { statusAccepted, statusCanceled, statusFinished, totalBookings } =
    data?.statistics || {};
  const {
    salesWithOwn,
    salesNewClients,
    salesWithCloser,
    totalSales,
    closerCommission,
  } = data?.statistics || {};

  const loading = isFetching || isLoading;

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("bookingsStatistics")}
        subtitle={dayjs(day, "YYYY/MM/DD").format("D MMM YYYY")}
      />
      {loading && <Spinner />}
      {!loading && (
        <ScrollView style={styles.scrollView}>
          <Stack direction="row" justify="around" sx={styles.countersContainer}>
            <ItemSummary
              title={t("newClients")}
              counter={numberWithComma(newClients)}
              bgColor={success}
            />
            <ItemSummary
              title={t("ownClients")}
              counter={numberWithComma(ownClients)}
              bgColor="#ccf2ff"
            />
            <ItemSummary
              title={t("closerClients")}
              counter={numberWithComma(closerClients)}
              bgColor="#fff5cc"
            />
          </Stack>
          <Divider style={styles.divider} />
          <Heading title={t("orders")} sx={styles.heading} />
          <ItemList
            title={t("acceptedOrders")}
            counter={numberWithComma(statusAccepted)}
          />
          <ItemList
            title={t("finishedOrders")}
            counter={numberWithComma(statusFinished)}
          />
          <ItemList
            title={t("canceledOrders")}
            counter={numberWithComma(statusCanceled)}
          />
          <ItemList
            title={t("total")}
            counter={numberWithComma(totalBookings)}
            bold
          />
          <Divider style={styles.divider} />
          <Stack direction="row" align="center">
            <Heading title={t("sales")} sx={styles.heading} />
            <Pressable onPress={() => SHOW_BS()} style={{ padding: 15 }}>
              <Icon name="info" type="feather" size={17.5} />
            </Pressable>
          </Stack>
          <ItemList
            title={t("salesNewClients")}
            counter={`${numberWithComma(salesNewClients)} lei`}
          />
          <ItemList
            title={t("salesWithOwn")}
            counter={`${numberWithComma(salesWithOwn)} lei`}
          />
          <ItemList
            title={t("salesWithCloser")}
            counter={`${numberWithComma(salesWithCloser)} lei`}
          />
          <ItemList
            title={t("totalSales")}
            counter={`${numberWithComma(totalSales)} lei`}
          />
          <ItemList
            title={t("closerCommission")}
            counter={`${numberWithComma(closerCommission)} lei`}
            bold
          />
        </ScrollView>
      )}
      {BOTTOM_SHEET}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: { flex: 1 },
  countersContainer: {
    paddingTop: 30,
    paddingBottom: 50,
    width: "100%",
    paddingHorizontal: 15,
  },
  counter: { color: black, fontWeight: "700", fontSize: 18 },
  bullet: { width: 10, height: 10, borderRadius: 50 },
  label: {
    color: black,
    marginLeft: 7.5,
    fontWeight: "500",
    fontSize: 13,
  },
  heading: { fontSize: 16, marginLeft: 15 },
  divider: { marginVertical: 10 },
  listItem: { marginBottom: 15, marginHorizontal: 15 },
  statusLabel: { fontSize: 15, color: black },
  status: { color: black, fontWeight: "500", fontSize: 15 },
  headingSheet: {
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 19,
    color: black,
  },
});
