import { StyleSheet, Text, View } from "react-native";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import DisplayText from "../Typography/DisplayText/DisplayText";
import { Divider } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { grey0 } = theme.lightColors || {};

type IProps = {
  avatar: any;
  username: string;
  description: string;
  date: string;
  onGoToUserAllInfo: () => void;
};

export const CardPostDescription = ({
  avatar,
  username,
  description,
  date,
  onGoToUserAllInfo,
}: IProps) => {
  return (
    <>
      <View style={styles.headerCont}>
        <CustomAvatar size={32.5} avatar={avatar} />
        <View style={styles.textCont}>
          {description ? (
            <DisplayText
              text={description}
              maxWords={10}
              username={username}
              goToUserAllInfo={onGoToUserAllInfo}
            />
          ) : (
            <Text>...</Text>
          )}
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
