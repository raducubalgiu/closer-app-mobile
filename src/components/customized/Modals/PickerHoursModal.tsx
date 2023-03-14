import { StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { CModal, FormInputSelect, Stack, Button } from "../../core";
import { useTranslation } from "react-i18next";
import { isGreaterThan } from "../../../utils/validation";

type Minutes = {
  id: string | number;
  name: string;
};

type IProps = {
  handleHours: (data: any) => void;
  onCloseModal: (withoutChangeIndex: boolean) => void;
  visible: boolean;
  minutes: Minutes[];
};

interface IFormInputs {
  startMinutes: "";
  endMinutes: "";
}

export const PickerHoursModal = ({
  handleHours,
  onCloseModal,
  visible,
  minutes,
}: IProps) => {
  const methods = useForm<IFormInputs>({
    defaultValues: {
      startMinutes: "",
      endMinutes: "",
    },
  });
  const { handleSubmit, watch } = methods;
  const { t } = useTranslation("common");
  const startMinutes = watch("startMinutes");
  const endMinutes = watch("endMinutes");
  const { isGreater } = isGreaterThan(startMinutes, endMinutes, t);

  const modalFooter = (
    <Button
      onPress={handleSubmit(handleHours)}
      title={t("add")}
      disabled={isGreater.value}
    />
  );

  return (
    <CModal
      size="sm"
      visible={visible}
      onCloseModal={() => onCloseModal(!!startMinutes && !!endMinutes)}
      footer={modalFooter}
      headerTitle={t("hoursInterval")}
    >
      <FormProvider {...methods}>
        <Stack direction="row" sx={styles.container}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <FormInputSelect
              items={minutes.slice(0, minutes.length - 1)}
              name="startMinutes"
              placeholder={t("from")}
              label={t("from")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormInputSelect
              items={minutes.slice(0, minutes.length - 1)}
              name="endMinutes"
              placeholder={t("until")}
              label={t("until")}
            />
          </View>
        </Stack>
      </FormProvider>
    </CModal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 25 },
});
