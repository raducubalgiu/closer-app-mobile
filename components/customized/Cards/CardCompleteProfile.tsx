import { StyleSheet, Text } from "react-native";
import { Stack, AvatarComplete } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  iconName: string;
  iconType: string;
  withBadge: boolean;
  title: string;
  description: string;
};

const CardCompleteProfile = ({
  iconName,
  iconType,
  withBadge,
  title,
  description,
}: IProps) => {
  return (
    <Stack sx={styles.container}>
      <Stack>
        <AvatarComplete
          iconName={iconName}
          iconType={iconType}
          withBadge={withBadge}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
      {/* <CardButton
        title={props.actionTitle}
        completed={props.completed}
        onPress={props.onPress}
      /> */}
    </Stack>
  );
};

export default CardCompleteProfile;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginRight: 15,
    borderRadius: 5,
    minWidth: 220,
    maxWidth: 230,
    height: 210,
  },
  title: {
    color: black,
    textAlign: "center",
    marginBottom: 2.5,
  },
  description: {
    color: grey0,
    fontSize: 12,
    textAlign: "center",
    maxWidth: 170,
  },
});
