import { View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { FormInputSelect, Stack, CustomModal, Button } from "../../core";
import { isGreaterThan } from "../../../utils/validation";
import { Period } from "../../../ts";

type Minutes = {
  id: string | number;
  name: string;
};

interface IFormInputs {
  sMinutes: "";
  eMinutes: "";
}

type IProps = {
  onClose: () => void;
  onAction: (data: IFormInputs) => void;
  minutes: Minutes[];
  visible: boolean;
  period: Period;
};

export const PickerHoursModal = ({
  visible,
  onClose,
  onAction,
  minutes,
  period,
}: IProps) => {
  const methods = useForm<IFormInputs>({
    defaultValues: {
      sMinutes: "",
      eMinutes: "",
    },
  });
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = methods;
  const { t } = useTranslation("common");
  const sMinutes = watch("sMinutes");
  const eMinutes = watch("eMinutes");
  const { isGreater } = isGreaterThan(sMinutes, eMinutes, t);

  const handleReset = () => {
    setValue("sMinutes", "");
    setValue("eMinutes", "");
  };

  const customFooter = (
    <Stack direction="row">
      {sMinutes && eMinutes && (
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button title="Reset" variant="outlined" onPress={handleReset} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Button
          title={t("add")}
          disabled={isGreater.value}
          onPress={handleSubmit(onAction)}
        />
      </View>
    </Stack>
  );

  return (
    <CustomModal
      visible={visible}
      title={t("hoursInterval")}
      onClose={onClose}
      action={t("add")}
      onAction={handleSubmit(onAction)}
      disabled={isGreater.value}
      customFooter={customFooter}
    >
      <FormProvider {...methods}>
        <Stack direction="row">
          <View style={{ flex: 1, marginRight: 20 }}>
            <FormInputSelect
              items={_.slice(minutes, 0, minutes.length - 1)}
              name="sMinutes"
              placeholder={t("from")}
              label={t("from")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormInputSelect
              items={_.slice(minutes, 0, minutes.length - 1)}
              name="eMinutes"
              placeholder={t("until")}
              label={t("until")}
            />
          </View>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
};
