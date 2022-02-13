import React, { useState } from "react";
import DatePicker from "react-native-date-picker";

const InlinePicker = () => {
  const [date, setDate] = useState(new Date());

  return <DatePicker date={date} onDateChange={setDate} />;
};

export default InlinePicker;
