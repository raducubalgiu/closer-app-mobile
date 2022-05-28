import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Header,
  Stack,
  MainButton,
  FormInputSelect,
} from "../../../../components/core";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { seconds } from "../../../../utils";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";
import axios from "axios";
import { BASE_ENDPOINT } from "@env";
import { useNavigation } from "@react-navigation/native";

const defaultValues = {
  startMonday: 32400,
  endMonday: 64800,
  startTuesday: 118800,
  endTuesday: 151200,
  startWednesday: 205200,
  endWednesday: 237600,
  startThursday: 291600,
  endThursday: 324000,
  startFriday: 378000,
  endFriday: 410400,
  startSaturday: 464400,
  endSaturday: 496800,
  startSunday: 550800,
  endSunday: 583200,
};
const { grey0 } = theme.lightColors;

const AddScheduleScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const methods = useForm({ defaultValues });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = methods;
  const { mon, tue, wed, thu, fri, sat, sun } = seconds;
  const navigation = useNavigation();

  const onSubmit = (data) => {
    setDisabled(true);
    setLoading(true);
    axios
      .patch(
        `${BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          opening_hours: {
            normal_days: {
              mon: {
                startTime: data.startMonday,
                endTime: data.endMonday,
              },
              tue: {
                startTime: data.startTuesday,
                endTime: data.endTuesday,
              },
              wed: {
                startTime: data.startWednesday,
                endTime: data.endWednesday,
              },
              thu: {
                startTime: data.startThursday,
                endTime: data.endThursday,
              },
              fri: {
                startTime: data.startFriday,
                endTime: data.endFriday,
              },
              sat: {
                startTime: data.startSaturday,
                endTime: data.endSaturday,
              },
              sun: {
                startTime: data.startSunday,
                endTime: data.endSunday,
              },
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setDisabled(false);
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setDisabled(false);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("addLocationSchedule")} />
      <Stack sx={styles.container}>
        <FormProvider {...methods}>
          <View style={styles.formCont}>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("monday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startMonday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endMonday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("tuesday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startTuesday"
                    items={tue}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endTuesday"
                    items={tue}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("wednesday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startWednesday"
                    items={wed}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endWednesday"
                    items={wed}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("thursday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startThursday"
                    items={thu}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endThursday"
                    items={thu}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("friday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startFriday"
                    items={fri}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endFriday"
                    items={fri}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("saturday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startSaturday"
                    items={sat}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endSaturday"
                    items={sat}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" sx={styles.dayCont}>
                <Text style={styles.day}>{t("sunday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startSunday"
                    items={sun}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endSunday"
                    items={sun}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
            </ScrollView>
            <MainButton
              size="lg"
              radius={10}
              fullWidth
              title={t("save")}
              loading={loading}
              onPress={handleSubmit(onSubmit)}
              disabled={disabled}
            />
          </View>
        </FormProvider>
      </Stack>
    </SafeAreaView>
  );
};

export default AddScheduleScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  formCont: { flex: 1, width: "100%" },
  startDay: { flex: 1, marginRight: 10 },
  endDay: { flex: 1 },
  dayCont: { marginBottom: 15 },
  day: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    flex: 1,
    color: grey0,
  },
});
