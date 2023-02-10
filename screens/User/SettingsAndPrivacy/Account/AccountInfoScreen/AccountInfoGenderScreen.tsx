import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormInputRadio, Spinner } from "../../../../../components/core";
import { HeaderEdit } from "../../../../../components/customized";
import { RootStackParams } from "../../../../../navigation/rootStackParams";
import theme from "../../../../../assets/styles/theme";
import { GenderEnum } from "../../../../../models/enums/genderEnum";
import { useAuth, usePatch } from "../../../../../hooks";
import { useNavigation } from "@react-navigation/native";

const { grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "AccountInfoGender">;

export const AccountInfoGenderScreen = ({ route }: IProps) => {
  const { user, setUser } = useAuth();
  const { gender } = route.params || {};
  const [checkboxGender, setCheckboxGender] = useState(gender);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleMale = () => setCheckboxGender("male");
  const handleFemale = () => setCheckboxGender("female");
  const handleNone = () => setCheckboxGender("none");

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

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        title={t("gender")}
        onSave={handleSaveGender}
        disabledSave={isLoading || gender === checkboxGender}
        disabledBack={isLoading}
      />
      {!isLoading && (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ margin: 15, color: grey0 }}>
            {t("accountInfoDescription")}
          </Text>
          <FormInputRadio
            checked={checkboxGender === GenderEnum.MALE}
            text={t("male")}
            onPress={handleMale}
          />
          <FormInputRadio
            checked={checkboxGender === GenderEnum.FEMALE}
            text={t("female")}
            onPress={handleFemale}
          />
          <FormInputRadio
            checked={checkboxGender === GenderEnum.NONE}
            text={t("preferToNotSay")}
            onPress={handleNone}
          />
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
