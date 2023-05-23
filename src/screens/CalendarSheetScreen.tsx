import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../navigation/rootStackParams";
import { HeaderSheet } from "../components/customized";

type IProps = NativeStackScreenProps<RootStackParams, "CalendarSheet">;

export const CalendarSheetScreen = ({ route }: IProps) => {
  const { userId, name } = route.params;
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <HeaderSheet
        title="Calendar"
        description={name}
        onClose={() => navigation.goBack()}
      />
      <Text>CalendarSheetScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
