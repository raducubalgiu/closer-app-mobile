import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Header } from "../../../components/core";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { CardScheduleOverview } from "../../../components/customized";
import moment from "moment";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

const SchedulesScreen = ({ route }) => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const newSched = route?.params?.scheduleStart;
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

  const renderHeader = ({ section }) => (
    <Text style={styles.headerList}>
      {moment(section._id).utc().format("YYYY MMMM")}
    </Text>
  );

  const renderSchedules = ({ item }) => (
    <CardScheduleOverview
      onPress={() => navigation.navigate("ScheduleDetails", { schedule: item })}
      avatar={item.avatar}
      owner={item.owner.name}
      price={item.product.price}
      service={item.service.name}
      status={item.status}
      scheduleStart={item.scheduleStart}
      newSched={newSched === item.scheduleStart}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("mySchedules")} divider />
      <View style={styles.container}>
        <SectionList
          sections={schedules}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={false}
          renderItem={renderSchedules}
          renderSectionHeader={renderHeader}
          contentContainerStyle={{ padding: 15 }}
        />
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
