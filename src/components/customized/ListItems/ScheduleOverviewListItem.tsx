import { StyleSheet, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Schedule } from "../../../models/schedule";
import { UserListItemSimple } from "./UserListItemSimple";

const { black, grey0, error, success, primary } = theme.lightColors || {};

type IProps = { schedule: Schedule };

export const ScheduleOverviewListItem = ({ schedule }: IProps) => {
  const { ownerId, status, product, start } = schedule;
  const { name, avatar, checkmark, profession } = ownerId || {};
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToDetails = () =>
    navigation.navigate("ScheduleDetails", { schedule });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "canceled":
        return { color: error };
      case "finished":
        return { color: success };
      case "accepted":
        return { color: grey0 };
      default:
        return { color: success };
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "canceled":
        return t("canceled");
      case "finished":
        return t("finished");
      case "accepted":
        return t("accepted");
      default:
        return t("accepted");
    }
  };

  return (
    <Pressable onPress={goToDetails} style={{ paddingVertical: 15 }}>
      {status === "accepted" && (
        <Stack align="start">
          <Stack sx={styles.new}>
            <Text style={styles.newTxt}>{t("new")}</Text>
          </Stack>
        </Stack>
      )}
      <Stack direction="row" align="start">
        <Stack direction="row">
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Text style={styles.service}>{product?.name}</Text>
            <Stack direction="row" sx={{ marginTop: 5, marginBottom: 15 }}>
              <Icon name="clock" type="feather" color={grey0} size={20} />
              <Text style={styles.date}>
                {dayjs(start).utc().format("D MMMM, HH:mm")}
              </Text>
            </Stack>
            <UserListItemSimple
              checkmark={checkmark}
              name={name}
              avatar={avatar}
              profession={profession.name}
              avatarSize={30}
            />
          </Stack>
        </Stack>
        <Stack>
          <Text style={styles.price}>LEI {product?.price}</Text>
          <Text style={[styles.status, getStatusColor(status)]}>
            {getStatus(status)}
          </Text>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 14.5,
    color: black,
    fontWeight: "600",
  },
  profession: {
    color: grey0,
    marginTop: 2.5,
    fontSize: 13,
  },
  service: {
    fontSize: 16,
    color: black,
    fontWeight: "600",
  },
  date: {
    color: grey0,
    fontSize: 14.5,
    textTransform: "lowercase",
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: black,
    marginBottom: 5,
    fontWeight: "700",
  },
  status: {
    color: grey0,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  newCont: {
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: primary,
    borderRadius: 10,
  },
  new: {
    marginLeft: 10,
    marginBottom: 12.5,
    backgroundColor: primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2.5,
  },
  newTxt: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
  },
});
