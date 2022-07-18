import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import {
  CModal,
  FormInput,
  Textarea,
  MainButton,
  Accordion,
  FormInputSelect,
} from "../../core";
import { useAuth, useCalendar } from "../../../hooks";
import theme from "../../../assets/styles/theme";
import { useDates } from "../../../hooks";
import { scheduleChannel } from "../../../constants/constants";

const { grey0 } = theme.lightColors;

export const BusinessScheduleModal = ({
  visible,
  onCloseModal,
  onUpdateSchedules,
}) => {
  const { user } = useAuth();
  const {
    getStartTimeByDateAndHours,
    getLocationStartAndEnd,
    getEndTimeBySlot,
    getStartSeconds,
  } = useDates();
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const methods = useForm({ firstName: "", lastName: "", job: "" });
  const { handleSubmit, watch } = methods;
  const selectedHour = watch("hour");
  const selectedService = watch("services");

  useEffect(() => {
    if (selectedService) {
      axios
        .get(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/services/${selectedService}/products`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedService]);

  const { calendar } = useCalendar(() => {});
  const { selectedDate } = calendar;
  const startTime = getStartTimeByDateAndHours(selectedDate, selectedHour);
  const endTime = getEndTimeBySlot(startTime);
  const startSeconds = getStartSeconds(startTime);
  const { locationStart, locationEnd } = getLocationStartAndEnd(
    user?.opening_hours?.normal_days,
    selectedDate
  );

  const onSubmit = (data) => {
    const product = products.find((prod) => prod._id === data.products);
    const service = user?.services.find((serv) => serv._id === data.services);
    const { name, price, option, duration } = product;

    setLoading(true);
    setDisabled(true);
    axios
      .post(
        `${process.env.BASE_ENDPOINT}/schedules?locationStart=${locationStart}&locationEnd=${locationEnd}`,
        {
          start: startTime,
          end: endTime,
          startSeconds,
          owner: user._id,
          customer: {
            name: `${data.firstName} ${data.lastName}`,
          },
          service: {
            _id: service?._id,
            name: service?.name,
          },
          product: {
            name,
            price,
            option: option?.name,
            duration,
          },
          description,
          channel: scheduleChannel.OWNER,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        setLoading(false);
        setDisabled(false);
        onUpdateSchedules(res.data.schedule);
        onCloseModal();
      })
      .catch((err) => {
        setDisabled(false);
        setLoading(false);
      });
  };

  const hours = [
    { _id: "00:00", name: "00: 00" },
    { _id: "00:30", name: "00: 30" },
    { _id: "01:00", name: "01: 00" },
    { _id: "01:30", name: "01: 30" },
    { _id: "02:00", name: "02: 00" },
    { _id: "02:30", name: "02: 30" },
    { _id: "03:00", name: "03: 00" },
    { _id: "03:30", name: "03: 30" },
    { _id: "04:00", name: "04: 00" },
    { _id: "04:30", name: "04: 30" },
    { _id: "05:00", name: "05: 00" },
    { _id: "05:30", name: "05: 30" },
    { _id: "06:00", name: "06: 00" },
    { _id: "06:30", name: "06: 30" },
    { _id: "07:00", name: "07: 00" },
    { _id: "07:30", name: "07: 30" },
    { _id: "08:00", name: "08: 00" },
    { _id: "08:30", name: "08: 30" },
    { _id: "09:00", name: "09: 00" },
    { _id: "09:30", name: "09: 30" },
    { _id: "10:00", name: "10: 00" },
    { _id: "10:30", name: "10: 30" },
    { _id: "11:00", name: "11: 00" },
    { _id: "11:30", name: "11: 30" },
    { _id: "12:00", name: "12: 00" },
    { _id: "12:30", name: "12: 30" },
    { _id: "13:00", name: "13: 00" },
    { _id: "13:30", name: "13: 30" },
    { _id: "14:00", name: "14: 00" },
    { _id: "14:30", name: "14: 30" },
    { _id: "15:00", name: "15: 00" },
    { _id: "16:00", name: "16: 00" },
    { _id: "16:30", name: "16: 30" },
    { _id: "17:00", name: "17: 00" },
    { _id: "17:30", name: "17: 30" },
    { _id: "18:00", name: "18: 00" },
    { _id: "18:30", name: "18: 30" },
    { _id: "19:00", name: "19: 00" },
    { _id: "19:30", name: "19: 30" },
    { _id: "20:00", name: "20: 00" },
    { _id: "20:30", name: "20: 30" },
    { _id: "21:00", name: "21: 00" },
    { _id: "21:30", name: "21: 30" },
    { _id: "22:00", name: "22: 00" },
    { _id: "22:30", name: "22: 30" },
    { _id: "23:00", name: "23: 00" },
    { _id: "23:30", name: "23: 30" },
  ];

  return (
    <CModal
      headerTitle="Adauga o programare"
      size="full"
      visible={visible}
      onCloseModal={onCloseModal}
      footer={
        <MainButton
          radius={10}
          size="lg"
          title="Adauga"
          loading={loading}
          //disabled={disabled}
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <ScrollView
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Data*</Text>
        <Accordion
          title={calendar.selectedDate}
          initExpand={false}
          sx={styles.accordion}
        >
          <View style={styles.calendar}>{calendar.calendarJSX}</View>
        </Accordion>
        <FormProvider {...methods}>
          <FormInputSelect
            placeholder=""
            name="hour"
            label="Ora*"
            items={hours}
          />
          <FormInputSelect
            placeholder=""
            name="services"
            label="Serviciu*"
            items={user?.services}
          />
          <FormInputSelect
            placeholder=""
            name="products"
            label="Produs*"
            items={products}
          />
          <FormInput placeholder="" name="lastName" label="Nume" />
          <FormInput placeholder="" name="firstName" label="Prenume" />
          <Textarea
            label="Descriere"
            placeholder="Adauga o descriere"
            lines={1}
            value={description}
            onSetValue={(value) => setDescription(value)}
            maxLength={30}
            showLength={false}
            sx={{ marginTop: 2.5, marginBottom: 10 }}
          />
        </FormProvider>
      </ScrollView>
    </CModal>
  );
};

const styles = StyleSheet.create({
  accordion: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  calendar: {
    marginTop: 2.5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 2.5,
    borderRadius: 5,
  },
  label: {
    fontFamily: "Exo-SemiBold",
    textTransform: "uppercase",
    color: grey0,
    marginBottom: 2.5,
  },
});
