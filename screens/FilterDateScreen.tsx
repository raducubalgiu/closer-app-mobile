import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ButtonGroup } from "../components/core";
import {
  FiltersContainer,
  PickerHoursModal,
  FixedPeriodList,
} from "../components/customized";
import DateRangePicker from "../components/customized/Calendars/DateRangePicker";
import { RootStackParams } from "../navigation/rootStackParams";
import { Period } from "../models/period";
import { dayMonthFormat } from "../utils/date-utils";
import { useCalendarList, useMinutes } from "../hooks";
import dayjs from "dayjs";
import { View } from "react-native";

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
  const { MONTHS, DAYS_HEADER } = useCalendarList();
  const now = dayjs().utc(true).startOf("day");
  const [period, setPeriod] = useState<Period>({
    id: "1",
    startDate: now,
    endDate: now.add(8, "day").startOf("day"),
    monthIndex: 0,
  });
  const [pickHour, setPickHour] = useState(`${t("pickHour")}`);

  const dateButtons = [
    { title: t("choosePeriod") },
    { title: t("fixedPeriods") },
  ];
  const hoursButtons = [{ title: t("anyHour") }, { title: pickHour }];

  const handleDateBtns = useCallback((index: number) => {
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

  const goNext = () => {};

  const handlePeriod = (per: Period) => setPeriod(per);

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
          <View style={{ flex: 1 }}>
            <DateRangePicker
              period={period}
              initialIndex={period?.monthIndex}
              onSetPeriod={handlePeriod}
              months={MONTHS}
              daysHeader={DAYS_HEADER}
            />
          </View>
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
