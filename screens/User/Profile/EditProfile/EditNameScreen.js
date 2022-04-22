import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const EditNameScreen = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState(user?.name);
  const navigation = useNavigation();

  const updateField = (text) => {
    setValue(text);
  };

  const updateName = (event) => {
    event.persist();
    axios
      .patch(
        `http://192.168.100.2:8000/api/v1/users/update`,
        {
          name: value,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setValue(res.data.user.name);
        setUser({ ...user, name: res.data.user.name });
        navigation.goBack();
      })
      .catch((err) => console.log(err));
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
