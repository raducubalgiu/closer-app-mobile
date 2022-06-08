import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import axios from "axios";
import { Header, MainButton, Stack } from "../../../components/core";
import { useAuth } from "../../../hooks";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";

const { error } = theme.lightColors;

const ScheduleCancelScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const cancelAppoinment = () => {
    if (moment(scheduleStart).isAfter(moment())) {
      axios
        .patch(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/schedules/${scheduleId}`,
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

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Anuleaza programarea" />
      <ScrollView>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
        <Text>ScheduleCancelScreen</Text>
      </ScrollView>
      <MainButton
        title={t("cancelAppoinment")}
        fullwidth
        size="lg"
        radius={25}
        bgColor={error}
        onPress={cancelAppoinment}
        sx={{ marginHorizontal: 20 }}
        disabled={true}
      />
    </SafeAreaView>
  );
};

export default ScheduleCancelScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, backgroundColor: "blue" },
});
