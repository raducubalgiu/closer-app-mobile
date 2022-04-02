import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../context/auth";

const EditWebsiteScreen = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("Website");

  const updateField = (text) => {
    setValue(text);
  };

  const updateWebsite = async () => {};

  return (
    <SafeAreaView style={styles.screen}>
      <EditField
        field="Website"
        onSave={updateWebsite}
        updateField={updateField}
        value={value}
        fieldLength={80}
      />
    </SafeAreaView>
  );
};

export default EditWebsiteScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
