import { View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { slice } from "lodash";
import { useTranslation } from "react-i18next";
import * as Animatable from "react-native-animatable";
import { FormInputSelect, Stack, CustomModal, Button } from "../../core";
import { isGreaterThan } from "../../../utils/validation";

type Minutes = {
  id: string | number;
  name: string;
};

interface IFormInputs {
  startMinutes: "";
  endMinutes: "";
}

type IProps = {
  onClose: () => void;
  onAction: (data: IFormInputs) => void;
  minutes: Minutes[];
  visible: boolean;
};

export const PickerHoursModal = ({
  visible,
  onClose,
  onAction,
  minutes,
}: IProps) => {
  const methods = useForm<IFormInputs>({
    defaultValues: {
      startMinutes: "",
      endMinutes: "",
    },
  });
  const { handleSubmit, watch, setValue } = methods;
  const { t } = useTranslation("common");
  const startMinutes = watch("startMinutes");
  const endMinutes = watch("endMinutes");
  const { isGreater } = isGreaterThan(startMinutes, endMinutes, t);

  const handleReset = () => {
    setValue("startMinutes", "");
    setValue("endMinutes", "");
    onAction({ startMinutes: "", endMinutes: "" });
  };

  const showReset = startMinutes && endMinutes;

  const customFooter = (
    <Stack direction="row">
      {showReset && (
        <Animatable.View
          animation={showReset ? "fadeIn" : "None"}
          duration={150}
          style={{ flex: 1, marginRight: 10 }}
        >
          <Button title="Reset" onPress={handleReset} variant="outlined" />
        </Animatable.View>
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
              items={slice(minutes, 0, minutes.length - 1)}
              name="startMinutes"
              placeholder={t("from")}
              label={t("from")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormInputSelect
              items={slice(minutes, 0, minutes.length - 1)}
              name="endMinutes"
              placeholder={t("until")}
              label={t("until")}
            />
          </View>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
};
