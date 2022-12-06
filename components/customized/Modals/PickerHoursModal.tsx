import { StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { CModal, FormInputSelect, Stack, Button } from "../../core";
import { useMinutes } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { isGreaterThan } from "../../../constants/validation";

type IProps = {
  handleHours: (data: any) => void;
  onCloseModal: (withoutChangeIndex: boolean) => void;
  visible: boolean;
};

export const PickerHoursModal = ({
  handleHours,
  onCloseModal,
  visible,
}: IProps) => {
  const methods = useForm({
    defaultValues: { startMinutes: "", endMinutes: "" },
  });
  const { handleSubmit, watch } = methods;
  const { minutes } = useMinutes();
  const { t } = useTranslation();
  const { isGreater } = isGreaterThan(
    watch("startMinutes"),
    watch("endMinutes"),
    t
  );
  const startMinutes = watch("startMinutes");
  const endMinutes = watch("endMinutes");

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
              items={minutes}
              name="startMinutes"
              placeholder={t("from")}
              label={t("from")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormInputSelect
              items={minutes}
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
