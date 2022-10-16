import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  Header,
  Stack,
  MainButton,
  FormInputSelect,
  CSwitch,
} from "../../../../components/core";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import theme from "../../../../assets/styles/theme";
import {
  useAuth,
  useHttpGet,
  useHttpPatch,
  useSeconds,
} from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
const { grey0, primary, black } = theme.lightColors;

const AddScheduleScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data: location } = useHttpGet(`/locations/${user?.location}`);
  const { mon, tue, wed, thu, fri, sat, sun } = location?.hours || {};

  const getStart = (day, def) => {
    if (day?.startTime) {
      return day.startTime;
    } else {
      return def;
    }
  };
  const getEnd = (day, def) => {
    if (day?.endTime) {
      return day.endTime;
    } else {
      return def;
    }
  };

  const methods = useForm({
    defaultValues: {
      startmon: getStart(mon, 32400),
      endmon: getEnd(mon, 64800),
      starttue: getStart(tue, 118800),
      endtue: getEnd(tue, 151200),
      startwed: getStart(wed, 205200),
      endwed: getEnd(wed, 237600),
      startthu: getStart(thu, 291600),
      endthu: getEnd(thu, 324000),
      startfri: getStart(fri, 378000),
      endfri: getEnd(fri, 410400),
      startsat: getStart(sat, -1),
      endsat: getEnd(sat, -1),
      startsun: getStart(sun, -1),
      endsun: getEnd(sun, -1),
    },
  });
  const { handleSubmit, getValues, setValue, watch } = methods;
  const { seconds } = useSeconds();
  const navigation = useNavigation();

  const { makePatch, loading } = useHttpPatch(
    `/locations/${user?.location}`,
    () => navigation.goBack()
  );

  const onSubmit = (data) => {
    makePatch({
      hours: {
        mon: {
          startTime: data.startmon,
          endTime: data.endmon,
        },
        tue: {
          startTime: data.starttue,
          endTime: data.endtue,
        },
        wed: {
          startTime: data.startwed,
          endTime: data.endwed,
        },
        thu: {
          startTime: data.startthu,
          endTime: data.endthu,
        },
        fri: {
          startTime: data.startfri,
          endTime: data.endfri,
        },
        sat: {
          startTime: data.startsat,
          endTime: data.endsat,
        },
        sun: {
          startTime: data.startsun,
          endTime: data.endsun,
        },
      },
    });
  };

  const handleChangeSwitch = (checked, startName, endName) => {
    if (checked) {
      setValue(`${startName}`, -1, { shouldValidate: true });
      setValue(`${endName}`, -1, { shouldValidate: true });
    } else {
      setValue(`${startName}`, 1);
      setValue(`${endName}`, 1);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("locationSchedule")} />
      <Stack sx={styles.container}>
        <FormProvider {...methods}>
          <View style={styles.formCont}>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
              {seconds.map((second, i) => (
                <Stack key={i} direction="row" sx={styles.dayCont}>
                  <Text style={styles.day}>{t(`${second.day}`)}</Text>
                  <CSwitch
                    onChange={(checked) => {
                      handleChangeSwitch(
                        checked,
                        `start${second?.day}`,
                        `end${second?.day}`
                      );
                    }}
                    defaultValue={getValues(`start${second?.day}`) !== -1}
                    color={primary}
                  />
                  <Stack sx={styles.startDay}>
                    <FormInputSelect
                      name={`start${second?.day}`}
                      items={second?.items}
                      placeholder={t("start")}
                      disabled={watch(`start${second?.day}`) === -1}
                    />
                  </Stack>
                  <Stack sx={styles.endDay}>
                    <FormInputSelect
                      name={`end${second?.day}`}
                      items={second?.items}
                      placeholder={t("end")}
                      disabled={watch(`start${second?.day}`) === -1}
                    />
                  </Stack>
                </Stack>
              ))}
            </ScrollView>
            <MainButton
              size="lg"
              radius={10}
              fullWidth
              title={t("save")}
              loading={loading}
              onPress={handleSubmit(onSubmit)}
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
  startDay: { flex: 1, marginRight: 10, marginLeft: 20 },
  endDay: { flex: 1 },
  dayCont: { marginBottom: 15 },
  day: {
    fontSize: 15,
    flex: 1,
    color: black,
    fontWeight: "600",
  },
});
