import {
  ScrollView,
  Text,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import axios from "axios";
import theme from "../../../../assets/styles/theme";
import { Stack, ListItem, Button, Spinner } from "../../../core";
import { useAuth, useRefresh } from "../../../../hooks";
import { displayZero } from "../../../../utils";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { scheduleChannel } from "../../../../constants/constants";

const { black, grey0, error, success, primary } = theme.lightColors;
const { width } = Dimensions.get("window");

export const DashboardScheduleTab = ({ startPeriod, lastPeriod }) => {
  const [stats, setStats] = useState([]);
  const [active, setActive] = useState({ count: true, sales: false });
  const [loading, setLoading] = useState(false);
  const { CLOSER, OWNER } = scheduleChannel;
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleRefresh = () => fetchStats();
  const { refreshing, onRefresh } = useRefresh(handleRefresh);

  const getData = (channel, action) => {
    const statsObj = stats.find((stat) => stat._id === channel);
    if (action === "count") {
      return statsObj?.count;
    }
    if (action === "sales") {
      return statsObj?.sales;
    }
  };

  const data = {
    labels: [t("closer"), t("own"), t("newClients"), t("total")],
    datasets: [
      {
        data: [
          getData(CLOSER, active.count ? "count" : "sales"),
          getData(OWNER, active.count ? "count" : "sales"),
          0,
          getData(CLOSER, active.count ? "count" : "sales") +
            getData(OWNER, active.count ? "count" : "sales"),
        ],
      },
    ],
  };

  const fetchStats = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user._id}/schedules/get-stats?startPeriod=${startPeriod}&lastPeriod=${lastPeriod}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [startPeriod, lastPeriod, user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleCount = useCallback(() => {
    setActive({ count: true, sales: false });
  }, []);
  const handleSales = useCallback(() => {
    setActive({ count: false, sales: true });
  }, []);

  const paymentMessage = (
    <Text style={styles.paymentMessage}>{t("pleaseMakePayment")}</Text>
  );

  const listItems = [
    {
      label: t("salesWithCloser"),
      amount: displayZero(getData(CLOSER, "sales")),
      percentage: 30,
    },
    {
      label: t("salesWithOwn"),
      amount: displayZero(getData(OWNER, "sales")),
      percentage: -10,
    },
    {
      label: t("totalSales"),
      amount: displayZero(getData(CLOSER, "sales") + getData(OWNER, "sales")),
      percentage: 10,
    },
    {
      label: t("closerCommission"),
      amount: displayZero(
        ((getData(CLOSER, "sales") + getData(OWNER, "sales")) * 10) / 100
      ),
      percentage: "",
    },
  ];

  const colorPerc = (percentage) => {
    if (percentage === 0) {
      return { ...styles.percentage, color: black };
    } else if (percentage > 0) {
      return { ...styles.percentage, color: success };
    } else if (percentage < 0) {
      return { ...styles.percentage, color: error };
    }
  };
  const displayPerc = (percentage) => {
    if (percentage === 0) {
      return `${percentage}%`;
    } else if (percentage > 0) {
      return `+ ${percentage}%`;
    } else if (percentage < 0) {
      return `${percentage}%`;
    }
  };

  const activeCountBtn = active.count
    ? { ...styles.btn, ...styles.btnActive }
    : { ...styles.btn };
  const activeSalesBtn = active.sales
    ? { ...styles.btn, ...styles.btnActive }
    : { ...styles.btn };
  const activeCountBtnTxt = active.count
    ? { ...styles.btnTxt, ...styles.btnTxtActive }
    : { ...styles.btnTxtActive };
  const activeSalesBtnTxt = active.sales
    ? { ...styles.btnTxt, ...styles.btnTxtActive }
    : { ...styles.btnTxtActive };

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {/* {paymentMessage} */}
          <Stack
            direction="row"
            align="start"
            justify="around"
            sx={{ paddingVertical: 20 }}
          >
            <Stack>
              <Text style={styles.title}>{t("schedules")}</Text>
              <Text style={styles.number}>
                {displayZero(
                  getData(CLOSER, "count") + getData(OWNER, "count")
                )}
              </Text>
            </Stack>
            <Stack>
              <Text style={styles.title}>{t("sales")}</Text>
              <Text style={styles.number}>
                LEI{" "}
                {displayZero(
                  getData(CLOSER, "sales") + getData(OWNER, "sales")
                )}
              </Text>
              <Text style={colorPerc(10)}>{displayPerc(10)}</Text>
            </Stack>
          </Stack>
          <Divider />
          <Stack align="start">
            {stats.length > 0 && (
              <Stack
                direction="row"
                justify="between"
                sx={{ width: width - 30 }}
              >
                <Text style={styles.sectionTitle}>Statistici</Text>
                <Stack direction="row">
                  <Button sx={activeCountBtn} onPress={handleCount}>
                    <Text style={activeCountBtnTxt}>
                      <Text>{t("schedules")}</Text>
                    </Text>
                  </Button>
                  <Button sx={activeSalesBtn} onPress={handleSales}>
                    <Text style={activeSalesBtnTxt}>
                      <Text>{t("sales")}</Text>
                    </Text>
                  </Button>
                </Stack>
              </Stack>
            )}
            {stats?.length > 0 && (
              <BarChart
                style={{
                  paddingTop: 15,
                  marginBottom: 15,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#ddd",
                }}
                data={data}
                width={width - 30}
                height={250}
                chartConfig={{
                  backgroundGradientFrom: "white",
                  backgroundGradientTo: "white",
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  useShadowColorFromDataset: false,
                  decimalPlaces: 0,
                  propsForVerticalLabels: {
                    fontSize: 14.5,
                    fontStyle: "italic",
                  },
                  propsForHorizontalLabels: {
                    fontWeight: "bold",
                    fontSize: 12,
                  },
                  barRadius: 2.5,
                  barPercentage: 0.8,
                }}
                fromZero={true}
                verticalLabelRotation={0}
                withInnerLines={false}
                showValuesOnTopOfBars={true}
                segments={3}
              />
            )}
            {stats.length === 0 && (
              <NoFoundMessage
                sx={{ marginTop: 0, paddingVertical: 15, width: width }}
                title="Opss.."
                description="Nu am gasit programari pentru perioada selectata"
                iconName="alert-circle"
                iconType="feather"
              />
            )}
          </Stack>
          <Divider />
          <Stack align="start">
            <Text style={styles.sectionTitle}>{t("sales")}</Text>
            {listItems.map((list, i) => (
              <ListItem key={i} between sx={{ marginBottom: 10 }}>
                <Text style={styles.label}>{list.label}</Text>
                <Stack align="end">
                  <Text style={styles.amount}>LEI {list.amount}</Text>
                  <Text style={colorPerc(list.percentage)}>
                    {displayPerc(list.percentage)}
                  </Text>
                </Stack>
              </ListItem>
            ))}
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
  },
  number: {
    fontFamily: "Exo-Bold",
    color: black,
    fontSize: 17,
    marginTop: 7.5,
  },
  percentage: { marginTop: 5, color: success },
  sectionTitle: {
    fontFamily: "Exo-Bold",
    color: black,
    paddingVertical: 15,
    fontSize: 17,
  },
  paymentMessage: {
    textAlign: "center",
    backgroundColor: error,
    color: "white",
    marginTop: 15,
    padding: 5,
    opacity: 0.85,
  },
  label: { fontFamily: "Exo-Medium", color: black, fontSize: 15 },
  amount: {
    fontFamily: "Exo-SemiBold",
    color: black,
  },
  percentage: { marginLeft: 2.5, fontSize: 13 },
  btn: {
    padding: 7.5,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#f1f1f1",
  },
  btnActive: { backgroundColor: primary },
  btnTxt: { fontFamily: "Exo-SemiBold", color: black },
  btnTxtActive: { fontFamily: "Exo-Bold", color: "white" },
});
