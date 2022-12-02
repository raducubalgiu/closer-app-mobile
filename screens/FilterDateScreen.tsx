import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import dayjs from "dayjs";
import { View } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ButtonGroup, Stack } from "../components/core";
import {
  FiltersContainer,
  SheetHeader,
  CalendarList,
  CalendarIntervalListItem,
  PickerHoursModal,
} from "../components/customized";
import { RootStackParams } from "../models/navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersDate">;

export const FiltersDateScreen = ({ route }: IProps) => {
  const { service, period } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const [activeBtn, setActiveBtn] = useState(period.code);
  const [activeHours, setActiveHours] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visible, setVisible] = useState(false);

  const dateButtons = [
    { title: t("selectDates") },
    { title: t("flexibleDates") },
  ];
  const hoursButtons = [{ title: t("anyHour") }, { title: t("pickHour") }];

  const handleDateBtns = useCallback((index: number) => {
    setStartDate(null);
    setEndDate(null);
    setActiveBtn(index);
  }, []);

  const handleHoursBtns = useCallback((index: number) => {
    setActiveHours(index);
    if (index === 1) setVisible(true);
    if (index === 0) setVisible(false);
  }, []);

  const footerBtns = (
    <>
      {activeBtn === 0 && (
        <ButtonGroup
          onPress={handleHoursBtns}
          buttons={hoursButtons}
          activeBtn={activeHours}
        />
      )}
      {activeBtn === 1 && <View />}
    </>
  );

  const goNext = () => {
    navigation.navigate("FiltersService", { startDate, endDate, service });
  };

  const handleDayPress = useCallback(
    (item: any) => {
      if (item.disabled) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (!startDate && !endDate) {
        setStartDate(item.date.format());
        setEndDate(null);
        return;
      }
      if (item.date.isBefore(startDate)) {
        setStartDate(item.date);
        return;
      }
      if (startDate && endDate) {
        setStartDate(item.date);
        setEndDate(null);
        return;
      }
      if (startDate) {
        setEndDate(item.date);
        return;
      }
    },
    [startDate, endDate]
  );

  const startDateHeader = startDate
    ? dayjs(startDate)?.format("D MMM").split(".")[0]
    : "";
  const endDateHeader = endDate
    ? dayjs(endDate)?.format("D MMM").split(".")[0]
    : "";

  const handleHours = (data: any) => console.log(data);

  return (
    <>
      <FiltersContainer
        headerTitle={t("select")}
        headerDescription={t("period")}
        onNext={goNext}
        btnTitle={t("next")}
        footerExtraBtns={footerBtns}
        disabled={!startDate && !endDate}
      >
        <SheetHeader
          title={service?.name}
          description={`${startDateHeader} - ${endDateHeader}`}
        />
        <ButtonGroup
          onPress={handleDateBtns}
          buttons={dateButtons}
          activeBtn={activeBtn}
          sx={{ marginBottom: 15 }}
        />
        {activeBtn === 0 && (
          <CalendarList
            startDate={startDate}
            endDate={endDate}
            onDayPress={handleDayPress}
          />
        )}
        {activeBtn === 1 && (
          <Stack sx={{ margin: 15 }}>
            <CalendarIntervalListItem
              title={t("anytime")}
              description={t("anytimeDescription")}
            />
            <CalendarIntervalListItem
              title={t("now")}
              description={t("nowDescription")}
            />
            <CalendarIntervalListItem
              title={t("after18")}
              description={t("after18Description")}
            />
          </Stack>
        )}
      </FiltersContainer>
      <PickerHoursModal
        visible={visible}
        onCloseModal={() => handleHoursBtns(0)}
        handleHours={handleHours}
      />
    </>
  );
};
