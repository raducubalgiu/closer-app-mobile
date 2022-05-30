import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
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
import { useAuth, useSeconds } from "../../../../hooks";
import axios from "axios";
import { BASE_ENDPOINT } from "@env";
import { useNavigation } from "@react-navigation/native";
const { grey0, primary } = theme.lightColors;

const AddScheduleScreen = () => {
  const { user, setUser } = useAuth();
  const { mon, tue, wed, thu, fri, sat, sun } =
    user?.opening_hours?.normal_days || {};
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {
      startmon: mon?.startTime ? mon?.startTime : 32400,
      endmon: mon?.endTime ? mon?.endTime : 64800,
      starttue: tue?.startTime ? tue?.startTime : 118800,
      endtue: tue?.endTime ? tue?.endTime : 151200,
      startwed: wed?.startTime ? wed?.startTime : 205200,
      endwed: wed?.endTime ? wed?.endTime : 237600,
      startthu: thu?.startTime ? thu?.startTime : 291600,
      endthu: thu?.endTime ? thu?.endTime : 324000,
      startfri: fri?.startTime ? fri?.startTime : 378000,
      endfri: fri?.endTime ? fri?.endTime : 410400,
      startsat: sat?.startTime ? sat?.startTime : -1,
      endsat: sat?.endTime ? sat?.endTime : -1,
      startsun: sun?.startTime ? sun?.startTime : -1,
      endsun: sun?.endTime ? sun?.endTime : -1,
    },
  });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, getValues, setValue, watch } = methods;
  const { seconds } = useSeconds();
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
          },
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setUser({ ...user, opening_hours: res.data.user.opening_hours });
        setDisabled(false);
        setLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        setDisabled(false);
        setLoading(false);
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
  startDay: { flex: 1, marginRight: 10, marginLeft: 20 },
  endDay: { flex: 1 },
  dayCont: { marginBottom: 15 },
  day: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    flex: 1,
    color: grey0,
  },
});
