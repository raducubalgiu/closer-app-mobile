import { StyleSheet, SafeAreaView, Keyboard, Text } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { HeaderEdit } from "../../../../components/customized";
import { Spinner, Stack } from "../../../../components/core";
import { useAuth, usePatch, useGetMutate } from "../../../../hooks";
import InputCheck from "../../../../components/core/Inputs/InputCheck";
import theme from "../../../../../assets/styles/theme";

const { error } = theme.lightColors || {};
type Available = { status: boolean; message: string };

export const EditUsernameScreen = () => {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation("common");
  const [username, setUsername] = useState(user?.username);
  const [isAvailable, setIsAvailable] = useState<Available>({
    status: true,
    message: "",
  });
  const { status, message } = isAvailable;

  const { mutate, isLoading: isLoadingGet } = useGetMutate({
    uri: `/users/${user?.id}/${username}/check`,
    onSuccess: (res) => setIsAvailable(res.data),
  });

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      if (username?.length) {
        mutate();
      }
    }, 1500);

    return () => clearTimeout(unsubscribe);
  }, [username]);

  const onChange = (text: string) => {
    setIsAvailable({ status: false, message: "typing" });
    setUsername(text);
  };

  const { mutate: update, isLoading: isLoadingUpdate } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: (res) => {
      setUser({ ...user, username: res.data.username });
      navigation.goBack();
    },
  });

  const handleUpdate = () => {
    Keyboard.dismiss();
    update({ username });
  };

  const disableSave =
    isLoadingUpdate || isLoadingGet || !status || user?.username === username;

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        title={t("username")}
        onSave={handleUpdate}
        disabledBack={isLoadingUpdate}
        disabledSave={disableSave}
      />
      <InputCheck
        placeholder={t("username")}
        value={username}
        isAvailable={status}
        isLoading={isLoadingGet}
        onChange={onChange}
      />
      {!!message && message !== "typing" && !isLoadingGet && (
        <Stack direction="row" justify="start" sx={{ margin: 15 }}>
          <Icon name="alert-triangle" type="feather" size={18} color={error} />
          <Text style={styles.errorMessage}>{t(`${message}`)}</Text>
        </Stack>
      )}
      {isLoadingUpdate && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  errorMessage: { fontSize: 13, marginLeft: 10, color: error, flex: 1 },
});
