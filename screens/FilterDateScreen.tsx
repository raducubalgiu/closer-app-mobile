import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ButtonGroup } from "../components/core";
import {
  FiltersContainer,
  CalendarList,
  PickerHoursModal,
  FixedPeriodList,
} from "../components/customized";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Period } from "../models/period";
import { dayMonthFormat } from "../utils/date-utils";
import { useMinutes } from "../hooks";
import dayjs from "dayjs";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersDate">;

export const FiltersDateScreen = ({ route }: IProps) => {
  const { service } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const { minutes } = useMinutes();
  const [visible, setVisible] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [activeHours, setActiveHours] = useState(0);
  const [period, setPeriod] = useState<Period>({
    startDate: null,
    endDate: null,
    startMinutes: null,
    endMinutes: null,
    code: "CALENDAR",
  });
  const [pickHour, setPickHour] = useState(`${t("pickHour")}`);

  const dateButtons = [
    { title: t("choosePeriod") },
    { title: t("fixedPeriods") },
  ];
  const hoursButtons = [{ title: t("anyHour") }, { title: pickHour }];

  const handleDateBtns = useCallback((index: number) => {
    setPeriod((period: Period) => ({
      ...period,
      startDate: null,
      endDate: null,
    }));
    setActiveBtn(index);
    setActiveHours(0);
    setPickHour(`${t("pickHour")}`);
  }, []);

  const handleHoursBtns = useCallback((index: number) => {
    setActiveHours(index);
    if (index === 1) setVisible(true);
    if (index === 0) {
      setVisible(false);
      setPickHour(`${t("pickHour")}`);
    }
  }, []);

  const goNext = () => {
    navigation.navigate("FiltersService", {
      period: {
        ...period,
        startDate: dayjs(period.startDate).format(),
        endDate: dayjs(period.endDate).format(),
      },
      service,
    });
  };

  const handleDayPress = useCallback(
    (item: any) => {
      if (item.disabled) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const { startDate, endDate } = period;

      if (!startDate && !endDate && !item.prevDates) {
        setPeriod((period: Period) => ({
          ...period,
          startDate: item.date,
          endDate: null,
        }));
        return;
      }
      if (item.date.isBefore(startDate) && !item.prevDates) {
        setPeriod((period: Period) => ({
          ...period,
          startDate: item.date,
        }));
        return;
      }
      if (startDate && endDate && !item.prevDates) {
        setPeriod((period: Period) => ({
          ...period,
          startDate: item.date,
          endDate: null,
        }));
        return;
      }
      if (startDate && !item.prevDates) {
        setPeriod((period: Period) => ({
          ...period,
          endDate: item.date,
        }));
        return;
      }
    },
    [period]
  );

  const getMinutesName = (min: number) => {
    const minuteEl = minutes.find((el) => el?.id === min);
    return minuteEl?.name;
  };

  const handleHours = useCallback((data: any) => {
    const { startMinutes, endMinutes } = data;
    setPeriod((period: Period) => ({ ...period, startMinutes, endMinutes }));
    setPickHour(
      `${getMinutesName(startMinutes)} - ${getMinutesName(endMinutes)}`
    );
    setVisible(false);
  }, []);

  let disabled;
  if (period.startDate && period.endDate) {
    disabled = false;
  } else {
    disabled = true;
  }

  const footerBtns = (
    <ButtonGroup
      onPress={handleHoursBtns}
      buttons={hoursButtons}
      activeBtn={activeHours}
    />
  );

  return (
    <>
      <FiltersContainer
        mainHeading={t("select")}
        secondHeading={t("period")}
        headerTitle={service?.name}
        headerDescription={`${dayMonthFormat(
          period.startDate
        )} - ${dayMonthFormat(period.endDate)}`}
        onNext={goNext}
        btnTitle={t("next")}
        footerExtraBtns={activeBtn === 0 ? footerBtns : null}
        disabled={disabled}
        closeBtn
      >
        <ButtonGroup
          onPress={handleDateBtns}
          buttons={dateButtons}
          activeBtn={activeBtn}
          sx={{ marginBottom: 15 }}
          disableActiveBtn={true}
        />
        {activeBtn === 0 && (
          <CalendarList
            startDate={period.startDate}
            endDate={period.endDate}
            onDayPress={handleDayPress}
          />
        )}
        {activeBtn === 1 && (
          <FixedPeriodList onSwitch={(checked: boolean) => {}} />
        )}
      </FiltersContainer>
      <PickerHoursModal
        visible={visible}
        minutes={minutes}
        onCloseModal={(notChangeIndex) =>
          !notChangeIndex
            ? handleHoursBtns(0)
            : setVisible((visible) => !visible)
        }
        handleHours={handleHours}
      />
    </>
  );
};
