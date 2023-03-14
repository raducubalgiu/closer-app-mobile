import { StyleSheet, Text, View, Pressable } from "react-native";
import { ButtonLink, Checkmark, Stack } from "../../../core";
import { memo, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  text: string;
  maxWords?: number;
  username?: string | null;
  checkmark?: boolean;
  postType?: string;
  goToUserAllInfo?: () => void;
};

const DisplayText = ({
  text = "",
  maxWords = 200,
  username = null,
  checkmark = false,
  postType = "feed",
  goToUserAllInfo,
}: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  let wordsArr = text.split(" ");
  const [cutText, setCutText] = useState(wordsArr.length > maxWords);

  const slicedArr = cutText ? wordsArr.slice(0, maxWords) : wordsArr;

  const goToUser = (uName: string) => {
    navigation.push("ProfileGeneral", {
      userId: "",
      username: uName,
      avatar: null,
      name: "",
      checkmark: false,
      service: null,
      option: null,
    });
  };

  const goToHashtag = (hashtag: string) =>
    navigation.push("Hashtag", { name: hashtag });

  const handleText = useCallback(() => {
    const displayText = [];

    for (let i = 0; i < slicedArr.length; i++) {
      let word = slicedArr[i];

      switch (true) {
        case word.startsWith("@"):
          displayText.push(
            <ButtonLink
              key={i}
              word={`${slicedArr[i]} `}
              onPress={() => goToUser(slicedArr[i].split("@")[1])}
              color={postType === "video" && "white"}
            />
          );
          break;
        case word.startsWith("#"):
          displayText.push(
            <ButtonLink
              key={i}
              word={`${slicedArr[i]} `}
              onPress={() => goToHashtag(slicedArr[i].split("#")[1])}
              color={postType === "video" && "white"}
            />
          );
          break;
        default:
          displayText.push(
            <Text
              style={{
                color: postType === "video" ? "#f2f2f2" : black,
                fontSize: postType === "video" ? 13.5 : 14,
              }}
              key={i}
            >{`${slicedArr[i]} `}</Text>
          );
      }
    }

    return displayText.map((el) => el);
  }, [slicedArr]);

  return (
    <View>
      {username && (
        <Stack direction="row" justify="start">
          <Pressable onPress={goToUserAllInfo}>
            <Text style={styles.username}>@{username} </Text>
          </Pressable>
          {checkmark && <Checkmark size={7.5} sx={styles.checkmark} />}
        </Stack>
      )}
      <View style={styles.container}>{handleText()}</View>
      {cutText && (
        <Pressable onPress={() => setCutText((cutText) => !cutText)}>
          <Text
            style={{
              color: postType === "video" ? "white" : grey0,
              fontWeight: postType === "video" ? "600" : "500",
            }}
          >
            ...mai mult
          </Text>
        </Pressable>
      )}
      {/* {!cutText && (
        <Pressable onPress={() => setCutText((cutText) => !cutText)}>
          <Text
            style={{
              color: postType === "video" ? "white" : grey0,
              fontWeight: postType === "video" ? "600" : "500",
            }}
          >
            ...mai putin
          </Text>
        </Pressable>
      )} */}
    </View>
  );
};

export default memo(DisplayText);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: 5,
  },
  username: {
    color: black,
    fontWeight: "500",
    fontSize: 15,
  },
  checkmark: { marginLeft: 5, marginRight: 10 },
});
