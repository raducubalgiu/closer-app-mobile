import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../context/auth";

const EditBioScreen = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("Bio");

  const updateField = (text) => {
    setValue(text);
  };

  const updateBio = async () => {};

  return (
    <SafeAreaView style={styles.screen}>
      <EditField
        field="Biografie"
        onSave={updateBio}
        updateField={updateField}
        value={value}
        fieldLength={200}
      />
    </SafeAreaView>
  );
};

export default EditBioScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
