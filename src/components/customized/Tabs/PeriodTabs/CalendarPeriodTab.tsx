import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { useCalendarList } from "../../../../hooks";
import { Spinner } from "../../../core";
import DateRangePicker from "../../Calendars/DateRangePicker";
import { Period } from "../../../../ts";

type IProps = {
  period: Period;
  onHandlePeriod: (period: Period) => void;
  minutes: any;
};

const CalendarPeriodTab = ({ period, onHandlePeriod, minutes }: IProps) => {
  const { MONTHS, DAYS_HEADER } = useCalendarList();

  return (
    <View style={{ flex: 1 }}>
      {minutes && (
        <DateRangePicker
          period={period}
          initialIndex={period?.monthIndex}
          onSetPeriod={onHandlePeriod}
          months={MONTHS}
          daysHeader={DAYS_HEADER}
        />
      )}
      {!minutes && <Spinner />}
    </View>
  );
};

export default memo(CalendarPeriodTab);

const styles = StyleSheet.create({});
