import { StyleSheet, SafeAreaView, FlatList, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Header } from "../../../components/core";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { CardScheduleOverview } from "../../../components/customized";

const SchedulesScreen = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/schedules`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => setSchedules(res.data.schedules))
        .catch((err) => console.log(err));
    }, [])
  );

  const renderSchedules = ({ item }) => {
    const { owner, service, product, status, scheduleStart } = item;

    return (
      <CardScheduleOverview
        avatar={owner?.avatar}
        owner={owner?.name}
        service={service?.name}
        price={product?.price}
        status={status}
        scheduleStart={scheduleStart}
        onPress={() => navigation.navigate("ScheduleDetails", { item })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("mySchedules")} />
      <FlatList
        contentContainerStyle={styles.container}
        data={schedules}
        keyExtractor={(item) => item?._id}
        renderItem={renderSchedules}
      />
    </SafeAreaView>
  );
};

export default SchedulesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 15,
    flex: 1,
  },
});
