import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  Text,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header, Spinner } from "../components/core";
import { useTranslation } from "react-i18next";
import { useAuth, useHttpGet } from "../hooks";
import { CardScheduleOverview, NoFoundMessage } from "../components/customized";
import moment from "moment";
import theme from "../assets/styles/theme";

const { black } = theme.lightColors;

export const SchedulesScreen = ({ route }) => {
  const { user } = useAuth();
  const { schedule } = route.params || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: schedules, loading } = useHttpGet(
    `/users/${user?._id}/schedules`
  );

  const goToDetails = () =>
    navigation.navigate("ScheduleDetails", {
      scheduleId: schedule._id,
    });

  const renderHeader = useCallback(
    ({ section }) => (
      <Text style={styles.headerList}>
        {moment(section._id).utc().format("YYYY MMMM")}
      </Text>
    ),
    []
  );
  const renderSchedules = useCallback(
    ({ item }) => (
      <CardScheduleOverview
        onPress={() =>
          navigation.navigate("ScheduleDetails", {
            scheduleId: item._id,
            location: item.owner.location,
          })
        }
        schedule={item}
        newSched={false}
      />
    ),
    []
  );

  useEffect(() => {
    if (schedule && schedules) {
      schedules.filter((sched) => sched._id !== schedule._id);
    }
  }, [schedule]);

  const keyExtractor = useCallback((item, index) => item + index, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myOrders")} hideBtnLeft divider />
      <View style={styles.container}>
        {schedule && !loading && (
          <View style={{ padding: 15 }}>
            <CardScheduleOverview
              onPress={goToDetails}
              schedule={schedule}
              newSched={true}
            />
          </View>
        )}
        {schedules?.length && !loading && (
          <SectionList
            sections={schedules}
            keyExtractor={keyExtractor}
            stickySectionHeadersEnabled={false}
            renderItem={renderSchedules}
            renderSectionHeader={renderHeader}
            contentContainerStyle={{ padding: 15 }}
          />
        )}
        {!schedules?.length && !loading && (
          <NoFoundMessage
            title={t("bookings")}
            description={t("dontHaveBookings")}
          />
        )}
        {loading && <Spinner />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: { paddingHorizontal: 15, paddingVertical: 10 },
  title: {
    fontSize: 17,
    color: theme.lightColors.black,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  headerList: {
    padding: 10,
    textTransform: "capitalize",
    fontSize: 15.5,
    color: black,
    marginBottom: 20,
  },
});
