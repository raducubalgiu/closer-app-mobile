import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";

const { black, primary, grey0 } = theme.lightColors || {};

type IProps = {
  avatar: any;
  name: string;
  date: string;
  rating: number;
  service: string;
  review: string;
};

export const CardRatings = ({
  avatar,
  name,
  date,
  rating,
  service,
  review,
}: IProps) => {
  return (
    <View style={styles.container}>
      <Stack direction="row" align="start">
        <Stack direction="row">
          <CustomAvatar size={45} avatar={avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </Stack>
      </Stack>
      <Divider style={{ marginTop: 15 }} />
      <Stack direction="row" sx={{ marginVertical: 5 }}>
        <AirbnbRating
          isDisabled={true}
          count={5}
          reviews={["Nesatisfacator", "Acceptabil", "Ok", "Bun", "Senzational"]}
          size={15}
          defaultRating={rating}
          reviewColor={black}
          selectedColor={primary}
          reviewSize={15}
        />
        <Text style={styles.service}>{service}</Text>
      </Stack>
      <Text style={styles.review}>{review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 15,
    marginBottom: 2.5,
  },
  date: {
    color: grey0,
    fontSize: 13,
  },
  service: {
    color: black,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  review: {
    fontSize: 14,
    marginVertical: 10,
    color: black,
  },
});
