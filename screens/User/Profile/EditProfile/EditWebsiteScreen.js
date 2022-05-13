import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";

const EditWebsiteScreen = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState(user?.website);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const updateField = (text) => {
    setValue(text);
  };

  const updateWebsite = (event) => {
    event.persist();
    Keyboard.dismiss();
    setLoading(true);
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          website: value,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setValue(res.data.user.website);
        setUser({ ...user, website: res.data.user.website });
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
        field="Website"
        onSave={updateWebsite}
        updateField={updateField}
        value={value}
        fieldLength={80}
        loading={loading}
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
