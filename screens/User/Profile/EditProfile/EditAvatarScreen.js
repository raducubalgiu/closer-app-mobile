import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import { MainButton, Stack } from "../../../../components/core";
import { useNavigation } from "@react-navigation/native";
import { CloseIconButton } from "../../../../components/customized";
import theme from "../../../../assets/styles/theme";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";

const { black } = theme.lightColors;

export const EditAvatarScreen = ({ route }) => {
  const { photo } = route.params;
  const navigation = useNavigation();

  const handleAvatar = async () => {
    // 1) Manipulate the photo (Crop etc)
    // const newImage = await manipulateAsync(
    //   photo.uri,
    //   [{ rotate: 60 }, { flip: FlipType.Vertical }],
    //   {
    //     compress: 1,
    //     format: SaveFormat.PNG,
    //   }
    // );
    // 2) Save to Cloudinary
    const photoInfo = await MediaLibrary.getAssetInfoAsync(photo);

    const formData = new FormData();
    formData.append("avatar", { name: photoInfo.localUri });

    const response = await axios.post(
      `http://192.168.100.2:8000/upload-one-image`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("RESPONSE!!", response.data);

    // 3) Update User Document
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
        <View style={{ width: 20 }} />
      </Stack>
      <Avatar
        size={350}
        source={{ uri: photo.uri }}
        containerStyle={{ marginBottom: 50 }}
      />
      <MainButton
        title="Salveaza"
        fullWidth
        size="lg"
        sx={{ marginHorizontal: 20 }}
        onPress={handleAvatar}
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
