import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import {
  ButtonGroup,
  CModal,
  FormInputSelect,
  Button,
  Stack,
} from "../components/core";
import { FiltersContainer, SheetHeader } from "../components/customized";
import { FormProvider, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersDate">;

export const FiltersDateScreen = ({ route }: IProps) => {
  const { service, period } = route.params;
  const { filters } = service;
  const navigation = useNavigation();
  const [activeBtn, setActiveBtn] = useState(period.code);
  const [activeHours, setActiveHours] = useState(0);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const methods = useForm({ defaultValues: { startHour: "", endHour: "" } });
  const { handleSubmit, watch } = methods;

  const goNext = () => {};

  const dateButtons = [
    { title: t("anytime") },
    { title: t("now") },
    { title: t("calendar") },
  ];
  const hoursButtons = [{ title: t("anyHour") }, { title: t("pickHour") }];
  const handleDateBtns = useCallback((index: number) => {
    setActiveBtn(index);
  }, []);
  const handleHoursBtns = useCallback((index: number) => {
    setActiveHours(index);
    if (index === 1) setVisible(true);
    if (index === 0) setVisible(false);
  }, []);

  const footerBtns = (
    <ButtonGroup
      onPress={handleHoursBtns}
      buttons={hoursButtons}
      activeButton={activeHours}
    />
  );

  const handleHours = (data) => console.log(data);
  const modalFooter = (
    <Button
      onPress={handleSubmit(handleHours)}
      title="Adauga"
      disabled={true}
    />
  );

  const hours = [
    { _id: "00:00", name: "00:00" },
    { _id: "00:30", name: "00:30" },
    { _id: "01:00", name: "01:00" },
  ];

  return (
    <>
      <FiltersContainer
        headerTitle={t("selectPeriod").split(" ")[0]}
        headerDescription={t("selectPeriod").split(" ")[1]}
        onNext={goNext}
        btnTitle={t("next")}
      >
        <SheetHeader title={service?.name} description="Date" />
        <ButtonGroup
          onPress={handleDateBtns}
          buttons={dateButtons}
          size="small"
          activeButton={activeBtn}
          sx={{ marginBottom: 15 }}
        />
        <Divider />
        {/* <View style={{ flex: 1 }}>{activeBtn === 2 && calendar}</View> */}
      </FiltersContainer>
      <CModal
        size="sm"
        visible={visible}
        onCloseModal={() => handleHoursBtns(0)}
        footer={modalFooter}
      >
        <FormProvider {...methods}>
          <Stack direction="row" sx={{ flex: 1, marginHorizontal: 25 }}>
            <View style={{ flex: 1, marginRight: 20 }}>
              <FormInputSelect
                items={hours}
                name="startHour"
                placeholder="De la"
                label="De la"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FormInputSelect
                items={hours}
                name="endHour"
                placeholder="Pana la"
                label="Pana la"
              />
            </View>
          </Stack>
        </FormProvider>
      </CModal>
    </>
  );
};
