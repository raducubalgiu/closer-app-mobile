import { StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { CModal, FormInputSelect, Stack, Button } from "../../core";
import { useMinutes } from "../../../hooks";
import { useTranslation } from "react-i18next";

type IProps = {
  handleHours: (data: any) => void;
  onCloseModal: () => void;
  visible: boolean;
};

export const PickerHoursModal = ({
  handleHours,
  onCloseModal,
  visible,
}: IProps) => {
  const methods = useForm({ defaultValues: { startHour: "", endHour: "" } });
  const { handleSubmit, watch } = methods;
  const { minutes } = useMinutes();
  const { t } = useTranslation();

  const modalFooter = (
    <Button
      onPress={handleSubmit(handleHours)}
      title={t("add")}
      disabled={true}
    />
  );

  return (
    <CModal
      size="sm"
      visible={visible}
      onCloseModal={onCloseModal}
      footer={modalFooter}
    >
      <FormProvider {...methods}>
        <Stack direction="row" sx={{ flex: 1, marginHorizontal: 25 }}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <FormInputSelect
              items={minutes}
              name="startHour"
              placeholder="De la"
              label="De la"
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormInputSelect
              items={minutes}
              name="endHour"
              placeholder="Pana la"
              label="Pana la"
            />
          </View>
        </Stack>
      </FormProvider>
    </CModal>
  );
};

const styles = StyleSheet.create({});
