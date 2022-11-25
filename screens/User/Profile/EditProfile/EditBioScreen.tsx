import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  View,
  TextInput,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Spinner } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../../hooks";

export const EditBioScreen = () => {
  const { user, setUser } = useAuth();
  const [bio, setBio] = useState(user?.description);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?._id}/update`,
    onSuccess: (res) => {
      setUser({ ...user, description: res.data.description });
      navigation.goBack();
    },
  });
  const updateBio = () => {
    Keyboard.dismiss();
    mutate({ description: bio });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("name")} onSave={updateBio} disabled={isLoading} />
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
          bio?.length < 200
            ? styles.strokeLength
            : { ...styles.strokeLength, color: "#F72A50" }
        }
      >
        {bio?.length ? bio?.length : 0} / 200
      </Text>
      {isLoading && <Spinner />}
    </SafeAreaView>
  );
};

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
  },
  strokeLength: {
    paddingHorizontal: 10,
    color: theme.lightColors.grey0,
    marginTop: 10,
  },
});
