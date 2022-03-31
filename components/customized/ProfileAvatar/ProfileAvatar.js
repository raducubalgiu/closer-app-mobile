import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Icon, Badge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import ContainedButton from "../../core/Buttons/ContainedButton";
import OutlinedButton from "../../core/Buttons/OutlinedButton";

const ProfileAvatar = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {props.user?.avatar && (
          <Avatar size={100} rounded source={{ uri: `${props.user.avatar}` }} />
        )}
        {!props.user?.avatar && (
          <Avatar
            size={90}
            rounded
            icon={{ name: "user", type: "font-awesome", size: 37 }}
            containerStyle={{ backgroundColor: "#ccc" }}
          />
        )}
        <Badge
          value={<Icon name="plus" type="entypo" size={17} color="white" />}
          containerStyle={{
            position: "absolute",
            bottom: 10,
            left: 80,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{props?.user?.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.job}>{props?.user?.job}</Text>
        {props?.user?.useRatings && (
          <>
            <Icon
              type="antdesign"
              name="star"
              color={Colors.primary}
              size={16}
              style={{ marginLeft: 7.5 }}
            />
            <Text style={styles.ratingsAverage}>4.5</Text>
          </>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.statsNumber}>
            {props?.user?.ratingsCount ? props?.user?.ratingsCount : 0}
          </Text>
          <Text style={styles.statsText}>Ratinguri</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.statsNumber}>
            {props?.user?.followersCount ? props?.user?.followersCount : 0}
          </Text>
          <Text style={styles.statsText}>Urmaritori</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.statsNumber}>
            {props?.user?.followingCount ? props?.user?.followingCount : 0}
          </Text>
          <Text style={styles.statsText}>Urmaresti</Text>
        </View>
      </View>
      {!props.user && (
        <View style={styles.buttonsContainer}>
          <View>
            <ContainedButton title="Urmareste" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <OutlinedButton title="Mesaj" />
          </View>
        </View>
      )}
      {props.user && (
        <View style={styles.buttonsContainer}>
          <OutlinedButton
            title="Editeaza profilul"
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileAvatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  name: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 17.5,
    marginTop: 5,
    marginBottom: 5,
  },
  job: {
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    marginLeft: 5,
    fontSize: 14,
  },
  ratingsAverage: { fontFamily: "Exo-SemiBold", marginLeft: 2.5 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  statsText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    fontSize: 13,
    marginTop: 5,
  },
  statsNumber: { fontFamily: "Exo-Bold", fontSize: 14 },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
