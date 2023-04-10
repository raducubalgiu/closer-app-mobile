import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { Stack } from "../../../../core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../../navigation/rootStackParams";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VideoDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();

  const goToSearch = () => navigation.navigate("SearchPosts", { search: "" });

  return (
    <View style={styles.container}>
      <Stack direction="row" sx={{ ...styles.header, marginTop: insets.top }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="close" type="antdesign" size={26} color="white" />
        </Pressable>
        <Pressable onPress={goToSearch}>
          <Icon name="search" type="feather" size={25} color="white" />
        </Pressable>
      </Stack>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      >
        <Text>Hello World</Text>
      </LinearGradient>
    </View>
  );
};

export default memo(VideoDetails);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  header: { marginVertical: 10 },
});
