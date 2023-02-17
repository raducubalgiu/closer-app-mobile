import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Button, FormInputRadio, Header } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { useAuth } from "../../../../hooks";

const { grey0 } = theme.lightColors || {};

export const PrivacyCommentsScreen = () => {
  const { user } = useAuth();
  const { viewComments } = user?.settings || {};
  const [canAddComment, setCanAddComment] = useState(viewComments);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} />
      <View style={styles.container}>
        <View>
          <FormInputRadio
            text={t("allPeople")}
            checked={canAddComment === "all"}
            onPress={() => setCanAddComment("all")}
            sx={{ paddingVertical: 0 }}
          />
          {canAddComment === "all" && (
            <Text style={styles.description}>
              {t("privacyCommentsAllDescription")}
            </Text>
          )}
          <Divider color="#ddd" style={{ marginVertical: 10 }} />
          <FormInputRadio
            text={t("followersThatYouAreFollowing")}
            checked={canAddComment === "followers"}
            onPress={() => setCanAddComment("followers")}
            sx={{ paddingVertical: 0 }}
          />
          {canAddComment === "followers" && (
            <Text style={styles.description}>
              {t("privacyCommentsFollowersThatYouAreFollowingDescription")}
            </Text>
          )}
          <Divider color="#ddd" style={{ marginVertical: 10 }} />
          <FormInputRadio
            text={t("nobody")}
            checked={canAddComment === "me"}
            onPress={() => setCanAddComment("me")}
            sx={{ paddingVertical: 0 }}
          />
          {canAddComment === "me" && (
            <Text style={styles.description}>
              {t("privacyCommentsNobodyDescription")}
            </Text>
          )}
        </View>
        <Button
          title={t("save")}
          onPress={() => {}}
          disabled={viewComments === canAddComment}
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
  description: { color: grey0, marginBottom: 15 },
});
