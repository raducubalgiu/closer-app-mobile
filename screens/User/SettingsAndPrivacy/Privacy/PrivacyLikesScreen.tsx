import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Button, FormInputRadio, Header } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { useAuth, usePatch } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../../../utils";

const { grey0, black, error } = theme.lightColors || {};

export const PrivacyLikesScreen = () => {
  const { user, setUser } = useAuth();
  const { likesCount } = user?.settings || {};
  const [showLikes, setShowLikes] = useState(likesCount);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: { ...user?.settings, likesCount: showLikes },
      });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () => mutate({ likesCount: showLikes });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Cine poate vedea postările apreciate de tine
          </Text>
          <FormInputRadio
            text={t("allPeople")}
            checked={showLikes === "all"}
            onPress={() => setShowLikes("all")}
            sx={{ paddingVertical: 0 }}
            variant="normal"
          />
          <Divider color="#ddd" style={{ marginVertical: 10 }} />
          <FormInputRadio
            text={t("justMe")}
            checked={showLikes === "me"}
            onPress={() => setShowLikes("me")}
            sx={{ paddingVertical: 0 }}
            variant="normal"
          />
        </View>
        <Button
          title={t("save")}
          onPress={handleUpdate}
          disabled={likesCount === showLikes || isLoading}
          loading={isLoading}
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
  title: {
    marginBottom: 25,
    color: black,
    fontWeight: "600",
    fontSize: 15,
  },
  description: { color: grey0, marginBottom: 15 },
});
