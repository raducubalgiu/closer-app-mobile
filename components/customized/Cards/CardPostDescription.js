import { StyleSheet, Text, View } from "react-native";
import { CustomAvatar } from "../../core";
import { DisplayText } from "../DisplayText/DisplayText";
import { Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { grey0 } = theme.lightColors;

export const CardPostDescription = ({
  avatar,
  username,
  description,
  date,
  onGoToUserAllInfo,
}) => {
  return (
    <>
      <View style={styles.headerCont}>
        <CustomAvatar size={32.5} iconSize={15} avatar={avatar} />
        <View style={styles.textCont}>
          <DisplayText
            text={description}
            maxWords={10}
            username={username}
            goToUserAllInfo={onGoToUserAllInfo}
          />
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 15 }} />
    </>
  );
};

const styles = StyleSheet.create({
  headerCont: { flexDirection: "row" },
  textCont: {
    marginLeft: 10,
    flex: 1,
  },
  date: {
    color: grey0,
    marginTop: 1,
    fontSize: 13,
  },
});
