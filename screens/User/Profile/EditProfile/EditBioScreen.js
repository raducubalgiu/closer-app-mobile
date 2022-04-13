import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../context/auth";

const EditBioScreen = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("Bio");

  const updateField = (text) => {
    setValue(text);
  };

  const updateBio = (event) => {
    event.persist();
    axios
      .patch(
        `http://192.168.100.2:8000/api/v1/users/update`,
        {
          description: value,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => setValue(res.data.user.description))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <EditField
        field="Nume"
        onSave={updateBio}
        updateField={updateField}
        value={value}
        fieldLength={40}
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
