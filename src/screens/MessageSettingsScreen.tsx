import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import theme from "../../assets/styles/theme";
import { Checkmark, Header, Heading, Stack } from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { SettingListItem } from "../components/customized";
import { useAuth, useDelete } from "../hooks";
import { ConfirmModal } from "../components/customized/Modals/ConfirmModal";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";

const { grey0, black, error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "MessageSettings">;

export const MessageSettingsScreen = ({ route }: IProps) => {
  const [modal, setModal] = useState(false);
  const { user } = useAuth();
  const { _id, avatar, name, username, checkmark, conversationId } =
    route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      userId: _id,
      avatar,
      name,
      username,
      checkmark: false,
      service: null,
      option: null,
    });
  };

  const { mutate: deleteConversation } = useDelete({
    uri: `/users/${user._id}/conversations/${conversationId}`,
    onSuccess: () => navigation.navigate("Messages"),
  });

  return (
    <SafeAreaView style={styles.screen}>
      <ConfirmModal
        title={t("deleteConversationQuestion")}
        description={`${t("messagesBetweenYouAnd")} ${name} ${t(
          "willBeDeleteAndNotRestored"
        )}`}
        visible={modal}
        onDelete={() => deleteConversation()}
        onCloseModal={() => setModal(false)}
      />
      <Header title="Detalii" divider />
      <Pressable onPress={goToUser}>
        <Stack direction="row" sx={{ padding: 15 }}>
          <Stack direction="row">
            <CustomAvatar avatar={avatar} size={55} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Stack direction="row">
                <Text style={{ fontSize: 16, color: black, fontWeight: "500" }}>
                  {name}
                </Text>
                {checkmark && <Checkmark sx={{ marginLeft: 7.5 }} />}
              </Stack>
              <Text style={{ marginTop: 2.5, color: grey0 }}>@{username}</Text>
            </Stack>
          </Stack>
          <Icon name="chevron-right" type="feather" color={grey0} />
        </Stack>
      </Pressable>
      <Stack sx={{ paddingHorizontal: 15 }} align="start">
        <Heading title={t("actions")} sx={styles.heading} />
        <SettingListItem
          defaultValue={false}
          title={t("stopMessages")}
          onValueChange={() => {}}
        />
        <SettingListItem
          defaultValue={false}
          title={t("disableNotifications")}
          onValueChange={() => {}}
        />
        <SettingListItem
          defaultValue={false}
          title={t("block")}
          onValueChange={() => {}}
        />
        <Pressable onPress={() => setModal(true)}>
          <Text style={{ color: error, fontSize: 15 }}>
            {t("deleteConversation")}
          </Text>
        </Pressable>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: { fontSize: 16, fontWeight: "600", marginBottom: 20 },
});
