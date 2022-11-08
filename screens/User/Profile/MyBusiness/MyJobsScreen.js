import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Header, IconButtonAdd, Stack } from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export const MyJobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToAddJob = () => navigation.navigate("AddJobs");

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myJobs")}
        actionBtn={
          <IconButtonAdd onPress={goToAddJob} disabled={jobs.length > 0} />
        }
      />
      <Stack sx={{ flex: 1 }}>
        <NoFoundMessage title={t("myJobs")} description={t("noJobsAdded")} />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
