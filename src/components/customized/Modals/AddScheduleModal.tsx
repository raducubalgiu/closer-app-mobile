import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, CModal, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { Icon } from "@rneui/themed";

const { black, grey0 } = theme.lightColors || {};
type IProps = { visible: boolean; onCloseModal: () => void; start: any };

export const AddScheduleModal = ({ visible, onCloseModal, start }: IProps) => {
  const { t } = useTranslation("common");

  return (
    <CModal
      size="md"
      visible={visible}
      headerTitle={t("addSchedule")}
      onCloseModal={onCloseModal}
      header={true}
      footer={<Button title={t("add")} onPress={() => {}} />}
      sx={styles.container}
    >
      <ScrollView style={styles.bodyCont}>
        <Icon
          name="calendar-clock"
          type="material-community"
          color="#ddd"
          size={35}
        />
      </ScrollView>
    </CModal>
  );
};

const styles = StyleSheet.create({
  container: {},
  bodyCont: {
    padding: 15,
  },
});
