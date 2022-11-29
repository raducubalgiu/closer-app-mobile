import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useCallback } from "react";
import { Header, Stack, Button } from "../../../../components/core";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { useAuth, usePatch, useMinutes } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import UserProgramListItem from "../../../../components/customized/ListItems/UserProgramListItem";

const DAYS = [
  { _id: "1", name: "mon" },
  { _id: "2", name: "tue" },
  { _id: "3", name: "wed" },
  { _id: "4", name: "thu" },
  { _id: "5", name: "fri" },
  { _id: "6", name: "sat" },
  { _id: "7", name: "sun" },
];

export const AddUserProgramScreen = () => {
  const { user, setUser } = useAuth();
  const { mon, tue, wed, thu, fri, sat, sun } = user?.hours || {};
  const { minutes } = useMinutes();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const getStart = (day, def) => {
    if (day?.start) {
      return day.start;
    } else {
      return def;
    }
  };
  const getEnd = (day, def) => {
    if (day?.end) {
      return day.end;
    } else {
      return def;
    }
  };

  const methods = useForm({
    defaultValues: {
      startmon: getStart(mon, -1),
      endmon: getEnd(mon, -1),
      starttue: getStart(tue, -1),
      endtue: getEnd(tue, -1),
      startwed: getStart(wed, -1),
      endwed: getEnd(wed, -1),
      startthu: getStart(thu, -1),
      endthu: getEnd(thu, -1),
      startfri: getStart(fri, -1),
      endfri: getEnd(fri, -1),
      startsat: getStart(sat, -1),
      endsat: getEnd(sat, -1),
      startsun: getStart(sun, -1),
      endsun: getEnd(sun, -1),
    },
  });
  const { handleSubmit, getValues, setValue, watch, formState } = methods;

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?._id}/update`,
    onSuccess: (res) => {
      const { hours } = res.data;
      setUser({ ...user, hours });
      navigation.goBack();
    },
  });

  const onSubmit = (data) => {
    mutate({
      hours: {
        mon: {
          start: data.startmon,
          end: data.endmon,
        },
        tue: {
          start: data.starttue,
          end: data.endtue,
        },
        wed: {
          start: data.startwed,
          end: data.endwed,
        },
        thu: {
          start: data.startthu,
          end: data.endthu,
        },
        fri: {
          start: data.startfri,
          end: data.endfri,
        },
        sat: {
          start: data.startsat,
          end: data.endsun,
        },
        sun: {
          start: data.startsun,
          end: data.endsun,
        },
      },
    });
  };

  const handleChangeSwitch = (checked: boolean, day: string) => {
    const start: any = "start".concat(day);
    const end: any = "end".concat(day);

    if (checked) {
      setValue(start, -1, { shouldValidate: true });
      setValue(end, -1, { shouldValidate: true });
    } else {
      setValue(start, getStart(day, 1));
      setValue(end, getEnd(day, 1));
    }
  };

  const renderDay = useCallback(({ item }) => {
    const start: any = "start".concat(item.name);

    return (
      <UserProgramListItem
        defaultChecked={getValues(start) !== -1}
        disabled={watch(start) === -1}
        minutes={minutes}
        day={item.name}
        onSwitchChange={handleChangeSwitch}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("locationSchedule")} />
      <Stack sx={styles.container}>
        <FormProvider {...methods}>
          <View style={styles.formCont}>
            <FlatList
              data={DAYS}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={renderDay}
              contentContainerStyle={{ marginTop: 15 }}
            />
            <Button
              size="lg"
              radius={10}
              title={t("save")}
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              disabled={!formState.isDirty}
            />
          </View>
        </FormProvider>
      </Stack>
    </SafeAreaView>
  );
};

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
});
