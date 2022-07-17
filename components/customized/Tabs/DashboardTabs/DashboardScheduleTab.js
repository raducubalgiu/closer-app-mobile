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
import moment from "moment";
import theme from "../../../../assets/styles/theme";
import { Stack, ListItem } from "../../../core";
import { useAuth, useRefresh } from "../../../../hooks";
import { displayZero } from "../../../../utils";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

const { black, grey0, error, success } = theme.lightColors;
const { width } = Dimensions.get("window");

export const DashboardScheduleTab = () => {
  const [stats, setStats] = useState([]);
  const [days, setDays] = useState(30);
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleRefresh = () => fetchStats();
  const { refreshing, onRefresh } = useRefresh(handleRefresh);

  const data = {
    labels: [t("closer"), t("own"), t("newClients"), t("total")],
    datasets: [
      {
        data: [
          stats[0]?.sales,
          stats[1]?.sales,
          0,
          stats[0]?.sales + stats[1]?.sales,
        ],
      },
    ],
  };

  const startPeriod = moment.utc().format();
  const lastPeriod = moment(startPeriod)
    .clone()
    .utc()
    .subtract(days, "days")
    .format();

  const fetchStats = useCallback(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user._id}/schedules/get-stats?startPeriod=${startPeriod}&lastPeriod=${lastPeriod}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [startPeriod, lastPeriod]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const paymentMessage = (
    <Text style={styles.paymentMessage}>{t("pleaseMakePayment")}</Text>
  );

  const listItems = [
    {
      label: t("salesWithCloser"),
      amount: displayZero(stats[0]?.sales),
      percentage: 30,
    },
    {
      label: t("salesWithOwn"),
      amount: displayZero(stats[1]?.sales),
      percentage: -10,
    },
    {
      label: t("totalSales"),
      amount: displayZero(stats[0]?.sales + stats[1]?.sales),
      percentage: 10,
    },
    {
      label: t("closerCommission"),
      amount: displayZero(((stats[0]?.sales + stats[1]?.sales) * 10) / 100),
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

  return (
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
            {displayZero(stats[0]?.count + stats[1]?.count)}
          </Text>
        </Stack>
        <Stack>
          <Text style={styles.title}>{t("sales")}</Text>
          <Text style={styles.number}>
            LEI {displayZero(stats[0]?.sales + stats[1]?.sales)}
          </Text>
          <Text style={colorPerc(10)}>{displayPerc(10)}</Text>
        </Stack>
      </Stack>
      <Divider />
      <Stack align="start">
        <Text style={styles.sectionTitle}>{t("quantities")}</Text>
        {stats.length > 0 && (
          <BarChart
            style={{
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
            sx={{ marginTop: 0, paddingBottom: 15 }}
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
});
