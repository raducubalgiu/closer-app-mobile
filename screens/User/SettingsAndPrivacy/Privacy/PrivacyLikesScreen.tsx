import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  FormInputRadio,
  Header,
  Heading,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { useAuth, usePatch } from "../../../../src/hooks";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../../../src/utils";

const { grey0, error } = theme.lightColors || {};

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
      showToast({ message: t("youChangedSettings"), short: true });
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
          <Heading
            title="Cine poate vedea postările apreciate de tine"
            sx={styles.heading}
          />
          <FormInputRadio
            title={t("allPeople")}
            checked={showLikes === "all"}
            onPress={() => setShowLikes("all")}
            sx={{ paddingVertical: 0 }}
            variant="normal"
          />
          <Divider color="#ddd" style={{ marginVertical: 10 }} />
          <FormInputRadio
            title={t("justMe")}
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
  heading: { marginTop: 0, marginBottom: 25 },
  description: { color: grey0, marginBottom: 15 },
});
