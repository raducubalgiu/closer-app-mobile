import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const EditNameScreen = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState(user?.name);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const updateField = (text) => {
    setValue(text);
  };

  const updateName = (event) => {
    event.persist();
    setLoading(true);
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/update`,
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
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <EditField
        field="Nume"
        onSave={updateName}
        updateField={updateField}
        value={value}
        fieldLength={40}
        loading={loading}
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
