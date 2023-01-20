import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";
import {
  Header,
  Heading,
  ListItem,
  Spinner,
  Stack,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, useGet, useRefreshByUser } from "../../../../hooks";

type IProps = NativeStackScreenProps<RootStackParams, "MyCalendarStatistics">;
const { success, black } = theme.lightColors || {};

const ItemList = ({ title, counter }: { title: string; counter: any }) => {
  return (
    <ListItem between sx={{ marginBottom: 15 }}>
      <Text style={styles.statusLabel}>{title}</Text>
      <Text style={styles.status}>{counter}</Text>
    </ListItem>
  );
};

const ItemSummary = ({
  counter,
  bgColor,
  title,
}: {
  counter: number;
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
  const { t } = useTranslation();

  const { data, isLoading, isFetching, refetch } = useGet({
    model: "calendarStatistics",
    uri: `/users/${user?.id}/schedules/calendar/statistics?day=${day}`,
  });

  const { newClients, ownClients, closerClients } = data?.statistics || {};
  const { statusAccepted, statusCanceled, statusFinished } =
    data?.statistics || {};
  const { totalBookings, totalSalesFinalized, closerCommission } =
    data?.statistics || {};

  const loading = isFetching || isLoading;
  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("bookingsStatistics")}
        subtitle={dayjs(day, "YYYY/MM/DD").format("D MMM YYYY")}
        divider
      />
      {loading && !refreshing && <Spinner />}
      {!loading && (
        <ScrollView refreshControl={refreshControl} style={styles.scrollView}>
          <Stack direction="row" justify="around" sx={styles.countersContainer}>
            <ItemSummary
              title={t("newClients")}
              counter={newClients}
              bgColor={success}
            />
            <ItemSummary
              title={t("ownClients")}
              counter={ownClients}
              bgColor="#ccf2ff"
            />
            <ItemSummary
              title={t("closerClients")}
              counter={closerClients}
              bgColor="#fff5cc"
            />
          </Stack>
          <Divider style={styles.divider} />
          <Heading title="Incasari" sx={styles.heading} />
          <ItemList title={t("acceptedOrders")} counter={statusAccepted} />
          <ItemList title={t("finishedOrders")} counter={statusFinished} />
          <ItemList title={t("canceledOrders")} counter={statusCanceled} />
          <ItemList title={t("total")} counter={totalBookings} />
          <Divider style={styles.divider} />
          <Heading title="Incasari" sx={styles.heading} />
          <ItemList
            title={t("salesFinishedOrders")}
            counter={`${totalSalesFinalized} lei`}
          />
          <ItemList
            title={t("closerCommission")}
            counter={`${closerCommission} lei`}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: { marginHorizontal: 15, flex: 1 },
  countersContainer: { paddingTop: 30, paddingBottom: 50, width: "100%" },
  counter: { color: black, fontWeight: "700", fontSize: 18 },
  bullet: { width: 10, height: 10, borderRadius: 50 },
  label: {
    color: black,
    marginLeft: 7.5,
    fontWeight: "500",
    fontSize: 13,
  },
  heading: { fontSize: 16 },
  divider: { marginVertical: 10 },
  statusLabel: { fontSize: 15, color: black },
  status: { color: black, fontWeight: "500", fontSize: 15 },
});
