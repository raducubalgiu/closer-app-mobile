import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormInputRadio, Spinner } from "../../../../../components/core";
import { HeaderEdit } from "../../../../../components/customized";
import { RootStackParams } from "../../../../../navigation/rootStackParams";
import theme from "../../../../../../assets/styles/theme";
import { GenderEnum } from "../../../../../ts";
import { useAuth, usePatch } from "../../../../../hooks";
import { useNavigation } from "@react-navigation/native";

const { grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "AccountInfoGender">;

export const AccountInfoGenderScreen = ({ route }: IProps) => {
  const { user, setUser } = useAuth();
  const { gender } = route.params || {};
  const [checkboxGender, setCheckboxGender] = useState(gender);
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: (res) => {
      setUser({ ...user, gender: res.data.gender });
      navigation.goBack();
    },
  });

  const handleSaveGender = () => {
    mutate({ gender: checkboxGender });
  };

  const inputs = [
    { title: t("male"), action: "male" },
    { title: t("female"), action: "female" },
    { title: t("preferToNotSay"), action: "none" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        title={t("gender")}
        onSave={handleSaveGender}
        disabledSave={isLoading || gender === checkboxGender}
        disabledBack={isLoading}
      />
      {!isLoading && (
        <View style={{ margin: 15 }}>
          <Text style={{ color: grey0, marginBottom: 15 }}>
            {t("accountInfoDescription")}
          </Text>
          {inputs.map((input, i) => (
            <FormInputRadio
              key={i}
              checked={input.action === GenderEnum.MALE}
              title={input.title}
              onPress={() => setCheckboxGender(input.action)}
            />
          ))}
        </View>
      )}
      {isLoading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
