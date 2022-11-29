import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useAuth, useGet } from "../../../../hooks";
import { CardProduct } from "../../Cards/CardProduct";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

type IProps = {
  userId: string;
  service: any;
  option: any;
  initialRoute: string;
};

export const ServiceTab = ({
  userId,
  service,
  option,
  initialRoute,
}: IProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
