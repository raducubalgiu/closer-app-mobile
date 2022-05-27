import { SafeAreaView, StyleSheet, Text } from "react-native";
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

const defaultValues = { startMonday: 32400, endMonday: 64800 };
const { grey0 } = theme.lightColors;

const AddScheduleScreen = () => {
  const { t } = useTranslation();
  const methods = useForm({ defaultValues });
  const [disabled, setDisabled] = useState(true);
  const { handleSubmit } = methods;
  const { mon } = seconds;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("addLocationSchedule")} />
      <Stack sx={styles.container}>
        <FormProvider {...methods}>
          <Stack sx={styles.formCont}>
            <Stack>
              <Stack direction="row">
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
              <Stack direction="row">
                <Text style={styles.day}>{t("tuesday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startTuesday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endTuesday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row">
                <Text style={styles.day}>{t("wednesday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startWednesday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endWednesday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row">
                <Text style={styles.day}>{t("thursday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startThursday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endThursday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row">
                <Text style={styles.day}>{t("friday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startFriday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endFriday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row">
                <Text style={styles.day}>{t("saturday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startSaturday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endSaturday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
              <Stack direction="row">
                <Text style={styles.day}>{t("sunday")}</Text>
                <Stack sx={styles.startDay}>
                  <FormInputSelect
                    name="startSunday"
                    items={mon}
                    placeholder={t("start")}
                  />
                </Stack>
                <Stack sx={styles.endDay}>
                  <FormInputSelect
                    name="endSunday"
                    items={mon}
                    placeholder={t("end")}
                  />
                </Stack>
              </Stack>
            </Stack>
            <MainButton
              size="lg"
              radius={10}
              fullWidth
              title={t("add")}
              onPress={handleSubmit(onSubmit)}
              disabled={disabled}
            />
          </Stack>
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
    marginTop: 30,
    marginHorizontal: 20,
    flex: 1,
  },
  formCont: { flex: 1, width: "100%" },
  startDay: { flex: 1, marginRight: 10 },
  endDay: { flex: 1 },
  day: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    flex: 1,
    color: grey0,
  },
});
