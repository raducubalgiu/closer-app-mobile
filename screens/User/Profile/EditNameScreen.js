import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../context/auth";
import { AuthService } from "../../../services/AuthService";

const EditNameScreen = () => {
  const { user } = useAuth();
  const [value, setValue] = useState(user?.name);

  const updateField = (text) => {
    setValue(text);
  };

  const updateName = async (event, value) => {
    event.persist();
    const { user } = await AuthService.updateUserName();
    console.log(user);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <EditField
        field="Nume"
        onSave={updateName}
        updateField={updateField}
        value={value}
        fieldLength={40}
      />
    </SafeAreaView>
  );
};

export default EditNameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
