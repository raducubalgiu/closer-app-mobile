import {
  ScrollView,
  Text,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack, ListItem, Spinner } from "../../../core";
import { useAuth, useGet, useRefreshByUser } from "../../../../hooks";
import { numberWithComma } from "../../../../utils";

const { black, grey0, error, success, primary } = theme.lightColors || {};
const { width } = Dimensions.get("window");
type IProps = { start: string; end: string };
type IListItem = { label: string; counter: string; percentage: string };

const ListItemSummary = ({ label, counter, percentage }: IListItem) => {
  return (
    <ListItem align="start" between sx={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <Stack align="end">
        <Text style={styles.amount}>{counter}</Text>
        <Text>{percentage}</Text>
      </Stack>
    </ListItem>
  );
};

export const DashboardScheduleTab = ({ start, end }: IProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const hasPayment = false;

  const {
    data: stats,
    refetch,
    isLoading,
    isFetching,
  } = useGet({
    model: "stats",
    uri: `/users/${user?.id}/schedules/stats?start=${start}&end=${end}`,
  });

  const loading = isLoading || isFetching;

  const {
    ordersNewClients,
    ordersOwnClients,
    ordersCloserClients,
    totalOrders,
    salesNewClients,
    salesOwnClients,
    salesCloserClients,
    totalSales,
    closerCommission,
  } = stats || {};

  const data = {
    labels: [t("newClients"), t("closer"), t("own"), t("total")],
    datasets: [
      {
        data: [
          ordersNewClients,
          ordersCloserClients,
          ordersOwnClients,
          totalOrders,
        ],
        // colors: [
        //   (opacity = 1) => `rgba(0, 204, 109, ${opacity})`,
        //   (opacity = 1) => `rgba(255, 245, 204, ${opacity})`,
        //   (opacity = 1) => `rgba(204, 242, 255, ${opacity})`,
        //   (opacity = 1) => "#ddd",
        // ],
      },
    ],
  };
  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          refreshControl={refreshControl}
        >
          {hasPayment && (
            <Text style={styles.paymentMessage}>{t("pleaseMakePayment")}</Text>
          )}
          <Stack
            direction="row"
            align="start"
            justify="around"
            sx={{ paddingVertical: 20 }}
          >
            <Stack>
              <Text style={styles.title}>{t("schedules")}</Text>
              <Text style={styles.number}>{numberWithComma(totalOrders)}</Text>
            </Stack>
            <Stack>
              <Text style={styles.title}>{t("sales")}</Text>
              <Text style={styles.number}>
                {numberWithComma(totalSales)} {t("lei")}
              </Text>
              <Text>-10%</Text>
            </Stack>
          </Stack>
          <Stack align="start">
            <Text style={styles.sectionTitle}>{t("orders")}</Text>
            <BarChart
              style={styles.barChartStyle}
              data={data}
              width={width - 30}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "red",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                backgroundGradientFromOpacity: 1,
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                useShadowColorFromDataset: false,
                decimalPlaces: 0,
                barRadius: 5,
                propsForVerticalLabels: {
                  fontSize: 13,
                },
                propsForHorizontalLabels: {
                  fontSize: 12,
                  fontWeight: "600",
                },
                barPercentage: 0.7,
              }}
              //withCustomBarColorFromData={true}
              //flatColor={true}
              fromZero={true}
              withInnerLines={false}
              showValuesOnTopOfBars={true}
              showBarTops={false}
              segments={3}
              withVerticalLabels={true}
            />
            {/* {stats.length === 0 && (
              <NoFoundMessage
                sx={{ marginTop: 0, paddingVertical: 15, width: width }}
                title="Opss.."
                description="Nu am gasit programari pentru perioada selectata"
                iconName="alert-circle"
                iconType="feather"
              />
            )} */}
          </Stack>
          <Stack align="start">
            <Text style={styles.sectionTitle}>{t("sales")}</Text>
            <ListItemSummary
              label={t("salesNewClients")}
              counter={`${numberWithComma(salesNewClients)} ${t("lei")}`}
              percentage="-10%"
            />
            <ListItemSummary
              label={t("salesWithCloser")}
              counter={`${numberWithComma(salesCloserClients)} ${t("lei")}`}
              percentage="-10%"
            />
            <ListItemSummary
              label={t("salesWithOwn")}
              counter={`${numberWithComma(salesOwnClients)} ${t("lei")}`}
              percentage="-10%"
            />
            <ListItemSummary
              label={t("totalSales")}
              counter={`${numberWithComma(totalSales)} ${t("lei")}`}
              percentage="-10%"
            />
            <ListItemSummary
              label={t("closerCommission")}
              counter={`${numberWithComma(closerCommission)} ${t("lei")}`}
              percentage="-10%"
            />
          </Stack>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16.5,
    color: grey0,
    fontWeight: "500",
  },
  number: {
    color: black,
    fontSize: 17,
    marginTop: 5,
    marginBottom: 2.5,
    fontWeight: "600",
    textTransform: "lowercase",
  },
  sectionTitle: {
    color: black,
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: "600",
  },
  paymentMessage: {
    textAlign: "center",
    backgroundColor: error,
    color: "white",
    marginTop: 15,
    padding: 5,
    opacity: 0.85,
  },
  label: { color: black, fontSize: 15 },
  amount: {
    color: black,
    fontWeight: "700",
    textTransform: "lowercase",
    marginBottom: 5,
  },
  btn: {
    padding: 7.5,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#f1f1f1",
  },
  btnActive: { backgroundColor: primary },
  btnTxt: { color: black },
  btnTxtActive: { color: "white" },
  barChartStyle: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
