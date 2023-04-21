import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { Icon } from "@rneui/themed";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/rootStackParams";
import theme from "../../../assets/styles/theme";
import { Button, FormInputRadio, Header, Stack } from "../../components/core";
import { useAuth, usePatch } from "../../hooks";
import { showToast } from "../../utils";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupUser">;
const { error } = theme.lightColors || {};

export const ChatGroupUserScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { userId, name, isAdmin, chatId } = route.params;
  const [admin, setAdmin] = useState(isAdmin);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { mutate: addAdminRights, isLoading: isLoadingAddAdmin } = usePatch({
    uri: `/users/${user?.id}/chats/${chatId}/groups/add-admin-rights`,
    onSuccess: () => navigation.pop(2),
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const { mutate: removeAdminRights, isLoading: isLoadingRemoveAdmin } =
    usePatch({
      uri: `/users/${user?.id}/chats/${chatId}/groups/remove-admin-rights`,
      onSuccess: () => navigation.pop(2),
      onError: () => showToast({ message: t("somethingWentWrong") }),
    });

  const { mutate: removeUser, isLoading: isLoadingRemove } = usePatch({
    uri: `/users/${user?.id}/chats/${chatId}/groups/remove-users`,
    onSuccess: () => navigation.pop(2),
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const loading = isLoadingAddAdmin || isLoadingRemoveAdmin || isLoadingRemove;

  const handleSave = () => {
    if (admin) {
      addAdminRights({ groupAdmin: userId });
    } else {
      removeAdminRights({ groupAdmin: userId });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={name} />
      <View style={styles.container}>
        <View>
          <FormInputRadio
            title={t("withAdminRights")}
            onPress={() => setAdmin(true)}
            checked={admin}
          />
          <FormInputRadio
            title={t("withoutAdminRights")}
            onPress={() => setAdmin(false)}
            checked={!admin}
          />
          <Pressable onPress={() => removeUser({ users: userId })}>
            <Stack direction="row" justify="start">
              <Icon name="log-out" type="feather" color={error} />
              <Text style={styles.logout}>Elimina din grup</Text>
            </Stack>
          </Pressable>
        </View>
        <Button
          title={t("save")}
          onPress={handleSave}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { margin: 15, justifyContent: "space-between", flex: 1 },
  logout: {
    color: error,
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 25,
    fontWeight: "500",
  },
});
