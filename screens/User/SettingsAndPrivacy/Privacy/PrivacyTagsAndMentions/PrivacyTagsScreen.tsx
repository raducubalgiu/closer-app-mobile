import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  FormInputRadio,
  Header,
  Heading,
} from "../../../../../components/core";
import theme from "../../../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../../../src/hooks";
import { showToast } from "../../../../../src/utils";
import { useNavigation } from "@react-navigation/native";

const { error } = theme.lightColors || {};

export const PrivacyTagsScreen = () => {
  const { user, setUser } = useAuth();
  const { tags } = user?.settings || {};
  const [isSelected, setIsSelected] = useState(tags);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: { ...user?.settings, tags: isSelected },
      });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("tags")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanTagYou")} />
          <FormInputRadio
            title={t("allPeople")}
            checked={isSelected === "all"}
            onPress={() => setIsSelected("all")}
            variant="normal"
            sx={{ paddingBottom: 0, marginTop: 5 }}
          />
          <Divider color="#ddd" style={styles.divider} />
          <FormInputRadio
            title={t("peopleThatYouAreFollowing")}
            checked={isSelected === "followings"}
            onPress={() => setIsSelected("followings")}
            variant="normal"
            sx={{ paddingVertical: 0 }}
          />
          <Divider color="#ddd" style={styles.divider} />
          <FormInputRadio
            title={t("followersThatYouAreFollowing")}
            checked={isSelected === "followingsAndFollowers"}
            onPress={() => setIsSelected("followingsAndFollowers")}
            variant="normal"
            sx={{ paddingVertical: 0 }}
          />
          <Divider color="#ddd" style={styles.divider} />
          <FormInputRadio
            title={t("nobody")}
            checked={isSelected === "nobody"}
            onPress={() => setIsSelected("nobody")}
            variant="normal"
            sx={{ paddingVertical: 0 }}
          />
        </View>
        <Button
          title={t("save")}
          disabled={isSelected === tags}
          loading={isLoading}
          onPress={() => mutate({ tags: isSelected })}
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
  divider: { marginVertical: 10 },
});
