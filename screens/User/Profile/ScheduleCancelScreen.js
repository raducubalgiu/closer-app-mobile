import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Feedback,
  Header,
  MainButton,
  Textarea,
} from "../../../components/core";
import { useAuth } from "../../../hooks";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import moment from "moment";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const { error, black, grey0 } = theme.lightColors;

const ScheduleCancelScreen = ({ route }) => {
  const { user } = useAuth();
  const { scheduleStart, scheduleId } = route.params;
  const [textarea, setTextarea] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [active, setActive] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const messages = [
    { _id: "1", message: t("cannotArrive") },
    { _id: "2", message: t("foundBetterOffer") },
    { _id: "3", message: t("others") },
  ];

  const cancelAppoinment = () => {
    if (moment(scheduleStart).isAfter(moment())) {
      setLoading(true);
      setDisabled(true);

      let message;
      if (textareaVal !== "") {
        message = textareaVal;
      } else {
        message = active.message;
      }

      axios
        .patch(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/schedules/${scheduleId}`,
          { status: "canceled", cancelMessage: message },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          setLoading(false);
          setDisabled(false);
          navigation.navigate({
            name: "ScheduleDetails",
            params: { schedule: res.data.schedule },
            merge: true,
          });
        })
        .catch(() => {
          setLoading(false);
          setDisabled(false);
          setFeedback({ visible: true, message: t("somethingWentWrong") });
        });
    } else {
      setLoading(false);
      setDisabled(false);
      setFeedback({
        visible: true,
        message: "You cannot cancel the appoinment anymore",
      });
    }
  };

  const handleActive = (item) => {
    setActive({ _id: item._id, message: item.message });
    if (item._id === "3") {
      setTextarea(true);
    } else {
      setTextarea(false);
    }
    setDisabled(false);
  };

  const activeBtn = { ...styles.btn, ...styles.activeBtn };
  const activeTxt = { ...styles.btnText, ...styles.activeTxt };

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{t("areYouSure")}</Text>
        <Text style={styles.secondHeading}>
          {t("helpUsProvingCancelMotivation")}
        </Text>
        <Divider style={styles.divider} />
        {messages.map((item, i) => (
          <Button
            key={i}
            sx={item._id === active._id ? activeBtn : styles.btn}
            onPress={() => handleActive(item)}
          >
            <Text style={item._id === active._id ? activeTxt : styles.btnText}>
              {item.message}
            </Text>
          </Button>
        ))}
        {textarea && (
          <Textarea
            value={textareaVal}
            lines={5}
            maxLength={200}
            radius={15}
            onSetValue={(value) => setTextareaVal(value)}
          />
        )}
      </ScrollView>
      <MainButton
        title={t("cancelAppoinment")}
        fullwidth
        size="lg"
        radius={25}
        bgColor={error}
        onPress={cancelAppoinment}
        sx={{ marginHorizontal: 20 }}
        disabled={disabled}
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default ScheduleCancelScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heading: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 25,
  },
  secondHeading: {
    fontFamily: "Exo-Medium",
    color: grey0,
    fontSize: 15,
    marginTop: 5,
  },
  divider: {
    paddingVertical: 10,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
    marginTop: 15,
    borderRadius: 5,
  },
  activeBtn: {
    backgroundColor: "#222222",
  },
  btnText: {
    fontFamily: "Exo-Medium",
    fontSize: 14,
    color: black,
  },
  activeTxt: {
    color: "white",
    fontFamily: "Exo-Regular",
  },
});
