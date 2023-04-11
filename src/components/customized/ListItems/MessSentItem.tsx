import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";
import { MessDateItem } from "./MessDateItem";
import { memo } from "react";

const { width } = Dimensions.get("window");
const { black, error, primary } = theme.lightColors || {};

const MessImage = ({ message, liked }: { message: any; liked: boolean }) => {
  return (
    <View>
      <Image
        source={{ uri: message?.url }}
        style={{ width: width / 2, height: 300, borderRadius: 10 }}
      />
      {liked && (
        <View style={styles.liked}>
          <Icon name="heart" type="antdesign" color={error} size={15} />
        </View>
      )}
    </View>
  );
};

const MessSentItem = ({
  item,
  dateSame,
  date,
}: {
  item: any;
  dateSame: boolean;
  date: string;
}) => {
  const { content, liked } = item || {};

  return (
    <View style={{ marginRight: 15 }}>
      <Stack
        direction="row"
        justify="end"
        sx={liked ? { marginBottom: 25 } : { marginBottom: 5 }}
      >
        {!content?.url && (
          <View style={styles.message}>
            <Text style={styles.messageText}>{content?.text}</Text>
            {liked && (
              <View style={styles.liked}>
                <Icon name="heart" type="antdesign" color={error} size={12.5} />
              </View>
            )}
          </View>
        )}
        {content?.url && <MessImage message={content} liked={liked} />}
      </Stack>
      {!dateSame && <MessDateItem date={date} />}
    </View>
  );
};

export default memo(MessSentItem);

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    backgroundColor: "#f1f1f1",
    marginLeft: width / 4,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
  },
  messageText: {
    color: black,
    fontSize: 15,
  },
  liked: {
    position: "absolute",
    bottom: -15,
    left: 15,
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
  },
});
