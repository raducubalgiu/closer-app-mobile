import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  Text,
} from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";
import { useAuth, useHttpGet } from "../hooks";
import { CardScheduleOverview, NoFoundMessage } from "../components/customized";
import moment from "moment";
import theme from "../assets/styles/theme";

const { black } = theme.lightColors;

const SchedulesScreen = ({ route }) => {
  const { user } = useAuth();
  const { schedule } = route.params || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: schedules } = useHttpGet(`/users/${user?._id}/schedules`);

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

  const renderSchedules = useCallback(({ item }) => {
    const { avatar, owner, product, service, status, scheduleStart } = item;

    return (
      <CardScheduleOverview
        onPress={() =>
          navigation.navigate("ScheduleDetails", { scheduleId: item._id })
        }
        avatar={avatar}
        owner={owner.name}
        price={product.price}
        service={service.name}
        status={status}
        scheduleStart={scheduleStart}
        newSched={false}
      />
    );
  }, []);

  const keyExtractor = useCallback((item, index) => item + index, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myOrders")} hideBtnLeft divider />
      <View style={styles.container}>
        {schedule && (
          <View style={{ padding: 15 }}>
            <CardScheduleOverview
              onPress={goToDetails}
              avatar={schedule.avatar}
              owner={schedule.owner.name}
              price={schedule.product.price}
              service={schedule.service.name}
              status={schedule.status}
              scheduleStart={schedule.scheduleStart}
              newSched={true}
            />
          </View>
        )}
        {schedules?.length > 0 && (
          <SectionList
            sections={schedules}
            keyExtractor={keyExtractor}
            stickySectionHeadersEnabled={false}
            renderItem={renderSchedules}
            renderSectionHeader={renderHeader}
            contentContainerStyle={{ padding: 15 }}
          />
        )}
        {schedules?.length === 0 && (
          <NoFoundMessage
            title={t("bookings")}
            description={t("dontHaveBookings")}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SchedulesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: { paddingHorizontal: 15, paddingVertical: 10 },
  title: {
    fontFamily: "Exo-Bold",
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
    fontFamily: "Exo-Bold",
    fontSize: 15.5,
    color: black,
    marginBottom: 20,
  },
});
