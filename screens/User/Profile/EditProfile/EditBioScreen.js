import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  View,
  TextInput,
  Text,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Feedback, Spinner } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";

const EditBioScreen = () => {
  const { user, setUser } = useAuth();
  const [bio, setBio] = useState(user?.description);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateBio = () => {
    Keyboard.dismiss();
    setLoading(true);
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          description: bio,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setUser({ ...user, description: res.data.user.description });
        setLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        setLoading(false);
        setFeedback({ visible: true, message: t("somethingWentWrong") });
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("name")} onSave={updateBio} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <View style={styles.textAreaContainer}>
        <TextInput
          value={bio}
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder={t("addBiography")}
          placeholderTextColor="#bbb"
          numberOfLines={5}
          multiline={true}
          onChangeText={(bio) => setBio(bio)}
          maxLength={200}
          autoFocus={true}
        />
      </View>
      <Text
        style={
          bio.length < 200
            ? styles.strokeLength
            : { ...styles.strokeLength, color: "#F72A50" }
        }
      >
        {bio.length} / 200
      </Text>
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditBioScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  textAreaContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    padding: 10,
    fontFamily: "Exo-Medium",
  },
  strokeLength: {
    paddingHorizontal: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    marginTop: 10,
  },
});
