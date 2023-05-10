import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { useAuth, useGetMutate } from "../../../hooks";
import InputCheck from "../../../components/core/Inputs/InputCheck";
import { Button, Stack } from "../../../components/core";
import { showToast } from "../../../utils";

const { grey0, error } = theme.lightColors || {};
type Available = { status: string; message: string };

export const UsernameScreen = ({ route }: any) => {
  const { idTokenResult, role } = route.params;
  const { displayName, photoURL } = idTokenResult;
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<Available>({
    status: "success",
    message: "",
  });
  const { status, message } = isAvailable;
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const { t } = useTranslation("common");

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const userResult = await axios.post(
        `${process.env.BASE_ENDPOINT}/users/register`,
        {
          username,
          name: displayName ? displayName : username,
          avatar: photoURL ? photoURL : [],
          role,
        },
        {
          headers: {
            Authorization: "Bearer " + idTokenResult?.token,
          },
        }
      );

      setUser({
        ...userResult.data,
        token: idTokenResult?.token,
      });
      setLoading(false);
    } catch (err) {
      showToast({ message: t("somethingWentWrong") });
      setLoading(false);
    }
  };

  const { mutate, isLoading: isLoadingGet } = useGetMutate({
    uri: `/users/${username}/check`,
    onSuccess: (res) => setIsAvailable(res.data),
    onError: (err) => {
      setIsAvailable({
        status: err.response.data.status,
        message: err.response.data.message,
      });
    },
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
    setIsAvailable({ status: "error", message: "typing" });
    setUsername(text);
  };

  const disable =
    loading || isLoadingGet || !status || !username || status === "error";

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("createAUsername")}</Text>
      </View>
      <Stack direction="row" sx={{ marginHorizontal: 15, marginTop: 40 }}>
        <Icon name="at-sign" type="feather" size={20} />
        <InputCheck
          placeholder={t("username")}
          value={username}
          isAvailable={status === "success"}
          isLoading={isLoadingGet}
          onChange={onChange}
        />
      </Stack>
      {status === "error" && message !== "typing" && !isLoadingGet && (
        <Stack direction="row" justify="start" sx={{ margin: 15 }}>
          <Icon name="alert-triangle" type="feather" size={18} color={error} />
          <Text style={styles.errorMessage}>{t(`${message}`)}</Text>
        </Stack>
      )}
      <View style={{ margin: 15 }}>
        <Text style={{ color: grey0, marginBottom: 15, fontSize: 13 }}>
          {t("usernameCanOnlyContainsDescription")}
        </Text>
        <Text style={{ color: grey0, fontSize: 13 }}>
          {t("usernameCanBeChangedAfter30days")}
        </Text>
      </View>
      <Button
        title={t("next")}
        onPress={handleSubmit}
        sxBtn={styles.nextBtn}
        disabled={disable}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    marginHorizontal: 30,
  },
  description: {
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 10,
    color: grey0,
    fontSize: 15,
  },
  errorMessage: { fontSize: 13, marginLeft: 10, color: error, flex: 1 },
  nextBtn: { marginHorizontal: 15, marginTop: 20 },
});
