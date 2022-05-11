import { StyleSheet } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

export const SwipableItem = ({ children, onPress, onDelete }) => {
  const { t } = useTranslation();
  return (
    <ListItem.Swipeable
      onPress={onPress}
      containerStyle={styles.container}
      rightContent={(reset) => (
        <Button
          title={t("delete")}
          onPress={onDelete}
          buttonStyle={{
            minHeight: "90%",
            backgroundColor: "#F72A50",
          }}
        />
      )}
    >
      <ListItem.Content>{children}</ListItem.Content>
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white", padding: 0 },
});
