import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { Header, IconButtonAdd, Stack } from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

export const MyJobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
