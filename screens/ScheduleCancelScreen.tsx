import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Header, Button, Textarea } from "../components/core";
import theme from "../assets/styles/theme";
import { useAuth, usePatch } from "../hooks";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { showToast } from "../utils";

const { error, black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ScheduleCancel">;

export const ScheduleCancelScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { scheduleId } = route.params;
  const [textarea, setTextarea] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const [active, setActive] = useState<any>(null);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const messages = [
    { id: "1", message: t("cannotArrive") },
    { id: "2", message: t("foundBetterOffer") },
    { id: "3", message: t("others") },
  ];

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/schedules/${scheduleId}`,
    onSuccess: () => navigation.navigate("Schedules"),
    onError: () => showToast({ message: "somethingWentWrong", bgColor: error }),
  });

  const cancelAppoinment = () =>
    mutate({
      status: "canceled",
      cancelMessage: active?.id === "3" ? textareaVal : active.message,
    });

  const handleActive = (item: any) => {
    setActive({ id: item.id, message: item.message });
    item.id === "3" ? setTextarea(true) : setTextarea(false);
  };

  const activeBtn = { ...styles.btn, ...styles.activeBtn };
  const activeTxt = { ...styles.btnText, ...styles.activeTxt };

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      const isSame = item?.id === active?.id;

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

  let footer;
  if (textarea) {
    footer = (
      <Textarea
        value={textareaVal}
        lines={5}
        maxLength={200}
        onSetValue={(value: string) => setTextareaVal(value)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="" />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ justifyContent: "space-between", flex: 1 }}
      >
        <FlatList
          ListHeaderComponent={header}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          ListFooterComponent={footer}
        />
        <Button
          title={t("cancelAppoinment")}
          size="lg"
          radius={25}
          bgColor={error}
          onPress={cancelAppoinment}
          sxBtn={{ marginHorizontal: 20 }}
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
