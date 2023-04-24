import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import dayjs from "dayjs";
import { Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import theme from "../../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";
import { showToast } from "../../../../utils";
import { Button, Stack } from "../../../../components/core";
import { CloseIconButton } from "../../../../components/customized";

const { black } = theme.lightColors || {};

type IProps = NativeStackScreenProps<RootStackParams, "EditAvatar">;

export const EditAvatarScreen = ({ route }: IProps) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { photo } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const formatFileName = `${dayjs().utc(true).format()}_${
    user?.username
  }_avatar`;

  const handleAvatar = async () => {
    let formData = new FormData();
    formData.append("avatar", {
      name: formatFileName,
      uri: photo.uri,
      type: "image/jpg",
    } as unknown as Blob);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.BASE_ENDPOINT}/users/${user?.id}/avatar`,
        {
          method: "PATCH",
          body: formData,
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      const data = await response.json();
      setUser({ ...user, avatar: data.avatar });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      showToast({ message: t("somethingWentWrong") });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" sx={{ padding: 15, width: "100%" }}>
        <CloseIconButton
          size={25}
          color={black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Avatar</Text>
        <View style={{ width: 20 }} />
      </Stack>
      <View style={styles.container}>
        <Avatar
          size={300}
          source={{ uri: photo.uri }}
          rounded
          containerStyle={{ marginTop: 50 }}
        />
        <Button
          title={t("save")}
          size="lg"
          onPress={handleAvatar}
          sxBtn={{ width: width - 30 }}
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: black,
    marginRight: 10,
    fontWeight: "700",
  },
});
