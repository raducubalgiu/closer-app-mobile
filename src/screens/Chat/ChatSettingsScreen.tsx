import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import theme from "../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { Header, Heading, Stack } from "../../components/core";
import CustomAvatar from "../../components/core/Avatars/CustomAvatar";
import { SettingsSwitchListItem } from "../../components/customized";
import { useAuth, usePost } from "../../hooks";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { showToast } from "../../utils";
import { useState } from "react";

const { grey0, black, error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ChatSettings">;

export const ChatSettingsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const [isBlocked, setIsBlocked] = useState(false);
  const { chat } = route.params;
  const { summary, isGroupChat, id } = route.params.chat;
  const { avatar, name } = summary;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const goToUser = () => {
    if (!isGroupChat) {
      navigation.push("ProfileGeneral", {
        username: name,
        service: null,
        option: null,
      });
    } else {
      navigation.push("ChatGroupSettings", { chatId: chat.id });
    }
  };

  const { mutate: block } = usePost({
    uri: `/users/${user?.id}/blocks/${id}`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      navigation.push("ProfileGeneral", {
        username: name,
        service: null,
        option: null,
      });
      showToast({ message: t("blocked") });
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Detalii" divider />
      <Pressable onPress={goToUser}>
        <Stack direction="row" sx={{ padding: 15 }}>
          <Stack direction="row">
            <CustomAvatar avatar={avatar} size={55} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.name}>{name}</Text>
              {isGroupChat && (
                <Text style={styles.groupSettings}>{t("groupSettings")}</Text>
              )}
            </Stack>
          </Stack>
          <Icon name="chevron-right" type="feather" color={grey0} />
        </Stack>
      </Pressable>
      <Stack sx={{ paddingHorizontal: 15 }} align="start">
        <Heading title={t("actions")} sx={styles.heading} />
        <SettingsSwitchListItem
          value={false}
          title={t("disableNotifications")}
          onValueChange={() => {}}
        />
        {!isGroupChat && (
          <SettingsSwitchListItem
            value={isBlocked}
            title={t("block")}
            onValueChange={() => {
              setIsBlocked(true);
              block({});
            }}
          />
        )}
        <Pressable onPress={() => {}}>
          <Text style={styles.deleteConv}>{t("deleteConversation")}</Text>
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
  name: {
    fontSize: 16,
    color: black,
    fontWeight: "500",
  },
  groupSettings: {
    color: grey0,
    fontSize: 15,
    marginTop: 2.5,
  },
  deleteConv: {
    color: error,
    fontSize: 16,
    paddingVertical: 20,
    fontWeight: "500",
  },
});
