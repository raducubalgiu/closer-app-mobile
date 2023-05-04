import {
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Button, IconBackButton, Input } from "../components/core";
import { MAIN_ROLE } from "@env";
import theme from "../../assets/styles/theme";
import { useAuth, usePatch } from "../hooks";
import { RootStackParams } from "../navigation/rootStackParams";
import { showToast } from "../utils";
import { useHeaderHeight } from "@react-navigation/elements";
import { useStore } from "../store/appStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { error, black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ScheduleCancel">;

export const ScheduleCancelScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { scheduleId } = route.params;
  const [textarea, setTextarea] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const [active, setActive] = useState<any>(null);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const headerHeight = useHeaderHeight();
  const { addSchedule } = useStore();
  const insets = useSafeAreaInsets();

  const messages = [
    { id: "1", message: t("cannotArrive") },
    { id: "2", message: t("foundBetterOffer") },
    { id: "3", message: t("others") },
  ];

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/schedules/${scheduleId}`,
    onSuccess: () => {
      addSchedule();
      user?.role !== MAIN_ROLE
        ? navigation.navigate("Schedules")
        : navigation.navigate("MyCalendar");
    },
    onError: () =>
      showToast({ message: t('"somethingWentWrong"'), bgColor: error }),
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
      <View style={{ marginTop: 20 }}>
        <Input
          value={textareaVal}
          maxLength={200}
          height={150}
          onChangeText={(value: string) => setTextareaVal(value)}
          withDetails
          placeholder="Care este motivul?"
          multiline={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={{ ...styles.header, paddingTop: insets.top + 10 }}>
        <IconBackButton />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          ListHeaderComponent={header}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          ListFooterComponent={footer}
          bounces={false}
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: "white",
    alignItems: "flex-start",
    paddingBottom: 10,
    paddingHorizontal: 15,
    zIndex: 10000,
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
    backgroundColor: black,
  },
  btnText: {
    fontSize: 14,
    color: black,
  },
  activeTxt: {
    color: "white",
  },
});
