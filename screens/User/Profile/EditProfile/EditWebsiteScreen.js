import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditField from "./EditFieldScreen";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const EditWebsiteScreen = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState("Website");
  const navigation = useNavigation();

  const updateField = (text) => {
    setValue(text);
  };

  const updateWebsite = () => {
    axios
      .patch(
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/update`,
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
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

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
