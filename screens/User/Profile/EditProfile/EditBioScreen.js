import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";

const EditBioScreen = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState(user?.description);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const updateField = (text) => {
    setValue(text);
  };

  const updateBio = (event) => {
    event.persist();
    Keyboard.dismiss();
    setLoading(true);
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          description: value,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setValue(res.data.user.description);
        setUser({ ...user, description: res.data.user.description });
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
        field="Biografie"
        onSave={updateBio}
        updateField={updateField}
        value={value}
        fieldLength={40}
        loading={loading}
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
