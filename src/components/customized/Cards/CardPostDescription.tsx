import { StyleSheet, Text, View } from "react-native";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import DisplayText from "../Typography/DisplayText/DisplayText";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";
import { fromNow } from "../../../utils/date-utils";

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
    <Stack
      direction="row"
      align="start"
      justify="start"
      sx={{ paddingVertical: 15 }}
    >
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
        <Text style={styles.date}>{fromNow(date)}</Text>
      </View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  textCont: {
    marginLeft: 10,
  },
  date: {
    color: grey0,
    marginTop: 10,
    fontSize: 13,
  },
});
