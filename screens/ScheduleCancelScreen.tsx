import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header, MainButton, Textarea } from "../components/core";
import theme from "../assets/styles/theme";
import { usePatch } from "../hooks";
import { RootStackParams } from "../models/navigation/rootStackParams";

const { error, black, grey0 } = theme.lightColors;

interface Message {
  _id: string;
  message: string;
}

export const ScheduleCancelScreen = ({ route }) => {
  const { scheduleId } = route.params;
  const [textarea, setTextarea] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const [active, setActive] = useState<Message>(null);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const messages = [
    { _id: "1", message: t("cannotArrive") },
    { _id: "2", message: t("foundBetterOffer") },
    { _id: "3", message: t("others") },
  ];

  const { mutate, isLoading } = usePatch({
    uri: `/schedules/${scheduleId}`,
    onSuccess: () => navigation.navigate("Schedules"),
  });

  const cancelAppoinment = () =>
    mutate({
      status: "canceled",
      cancelMessage: active?._id === "3" ? textareaVal : active.message,
    });

  const handleActive = (item: Message) => {
    setActive({ _id: item._id, message: item.message });
    item._id === "3" ? setTextarea(true) : setTextarea(false);
  };

  const activeBtn = { ...styles.btn, ...styles.activeBtn };
  const activeTxt = { ...styles.btnText, ...styles.activeTxt };

  const renderItem = useCallback(
    ({ item }) => {
      const isSame = item?._id === active?._id;

      return (
        <Pressable
          onPress={() => handleActive(item)}
          style={isSame ? activeBtn : styles.btn}
        >
          <Text style={isSame ? activeTxt : styles.btnText}>
            {item.message}
          </Text>
        </Pressable>
      );
    },
    [active]
  );

  const header = (
    <>
      <Text style={styles.heading}>{t("areYouSure")}</Text>
      <Text style={styles.secondHeading}>
        {t("helpUsProvingCancelMotivation")}
      </Text>
      <Divider style={styles.divider} />
    </>
  );

  const footer = textarea && (
    <Textarea
      value={textareaVal}
      lines={5}
      maxLength={200}
      onSetValue={(value: string) => setTextareaVal(value)}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ justifyContent: "space-between", flex: 1 }}
      >
        <FlatList
          ListHeaderComponent={header}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 15 }}
          ListFooterComponent={footer}
        />
        <MainButton
          title={t("cancelAppoinment")}
          size="lg"
          radius={25}
          bgColor={error}
          onPress={cancelAppoinment}
          sx={{ marginHorizontal: 20 }}
          loading={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    color: black,
    fontSize: 26,
    fontWeight: "600",
  },
  secondHeading: {
    color: grey0,
    fontSize: 15.5,
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
    fontSize: 14,
    color: black,
  },
  activeTxt: {
    color: "white",
  },
});
