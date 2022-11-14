import { SafeAreaView, StyleSheet, Dimensions, Text } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { Button, Header, MainButton, Stack } from "../../../../components/core";
import { useNavigation } from "@react-navigation/native";
import { CloseIconButton } from "../../../../components/customized";
import theme from "../../../../assets/styles/theme";
import * as ImagePicker from "expo-image-picker";

const { black } = theme.lightColors;

export const EditAvatarScreen = ({ route }) => {
  const { uri } = route.params;
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" sx={{ padding: 15, width: "100%" }}>
        <CloseIconButton
          size={25}
          color={black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Decupeaza</Text>
        <CloseIconButton size={25} color="white" />
      </Stack>
      <Avatar
        size={350}
        rounded
        source={{ uri }}
        containerStyle={{ marginBottom: 50 }}
      />
      <MainButton
        title="Salveaza"
        fullWidth
        size="lg"
        sx={{ marginHorizontal: 20 }}
        onPress={pickImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: black,
    marginRight: 10,
    fontWeight: "700",
  },
});
