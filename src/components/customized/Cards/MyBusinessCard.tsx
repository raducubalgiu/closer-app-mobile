import { StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const width = Dimensions.get("window").width;
const { black, grey0 } = theme.lightColors || {};

type IProps = {
  onPress: () => void;
  iconName: string;
  iconType: string;
  title: string;
  description: string;
  sx?: {};
  size?: number;
};

const MyBusinessCard = ({
  sx = {},
  onPress,
  iconName,
  iconType,
  size = 30,
  title,
  description,
}: IProps) => {
  return (
    <Pressable style={{ ...styles.container, ...sx }} onPress={onPress}>
      <Stack
        sx={{
          width: "100%",
          maxWidth: width / 2,
        }}
      >
        <Icon name={iconName} type={iconType} size={size} color={black} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
    </Pressable>
  );
};

export default MyBusinessCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 5,
    flex: 1,
  },
  title: {
    marginVertical: 10,
    fontSize: 15,
    color: black,
    textAlign: "center",
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
    color: grey0,
  },
});
