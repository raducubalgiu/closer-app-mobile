import { StyleSheet, Text } from "react-native";
import { memo, useState } from "react";
import { Switch } from "@rneui/themed";
import { Stack, FormInputSelect } from "../../core";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black } = theme.lightColors;

const UserProgramListItem = ({
  day,
  defaultChecked,
  minutes,
  onSwitchChange,
  disabled,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.dayCont}>
      <Text style={styles.day}>{t(day)}</Text>
      <Switch
        onValueChange={() => {
          setChecked((checked: boolean) => !checked);
          onSwitchChange(checked, day);
        }}
        value={checked}
      />
      <Stack sx={styles.startDay}>
        <FormInputSelect
          name={`start${day}`}
          items={minutes}
          placeholder={t("start")}
          disabled={disabled}
        />
      </Stack>
      <Stack sx={styles.endDay}>
        <FormInputSelect
          name={`end${day}`}
          items={minutes}
          placeholder={t("end")}
          disabled={disabled}
        />
      </Stack>
    </Stack>
  );
};

export default memo(UserProgramListItem);

const styles = StyleSheet.create({
  dayCont: { marginBottom: 15 },
  day: {
    fontSize: 15,
    flex: 1,
    color: black,
    fontWeight: "600",
  },
  startDay: { flex: 1, marginRight: 10, marginLeft: 20 },
  endDay: { flex: 1 },
});
