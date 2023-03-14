import { ButtonProvider } from "../Buttons/ButtonProvider";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black } = theme.lightColors || {};

export const AuthProviders = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <ButtonProvider
        onPress={() => {}}
        iconName="googleplus"
        iconType="antdesign"
        color="#DB4437"
        text={t("loginWithGoogle")}
      />
      <ButtonProvider
        onPress={() => {}}
        iconName="apple1"
        iconType="antdesign"
        color={black}
        text={t("loginWithApple")}
      />
      <ButtonProvider
        onPress={() => {}}
        iconName="facebook"
        iconType="material"
        color="#4267B2"
        text={t("loginWithFacebook")}
      />
    </>
  );
};
