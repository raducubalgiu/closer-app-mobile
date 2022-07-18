import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import {
  CustomAvatar,
  Protected,
  Stack,
  StatsButton,
  IconStar,
  Button,
  IconLocation,
} from "../../core";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { Icon } from "@rneui/themed";
import { displayDash } from "../../../utils";
import moment from "moment";

const { black, grey0, primary } = theme.lightColors;

export const ProfileOverview = ({
  _id,
  name,
  username,
  avatar,
  counter,
  distance,
  role,
  services,
  business,
  withBadge,
  withAvailable,
  available,
  location,
  children,
  endTime,
  showDetails,
}) => {
  const { user: userContext } = useAuth();
  const {
    ratingsAverage,
    ratingsQuantity,
    followersCount,
    followingCount,
    postsCount,
  } = counter || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleGoToProducts = (serviceId) => {
    if (_id === userContext?._id) {
      navigation.navigate("MyProducts", { serviceId });
    } else {
      navigation.navigate("Products", { serviceId });
    }
  };

  let status = available
    ? `${t("isClosingAt")} ${moment()
        .startOf("day")
        .seconds(endTime)
        .format("HH")}`
    : t("closed");

  return (
    <View style={styles.container}>
      <Stack justify="center" align="center">
        <Button>
          <CustomAvatar
            iconSize={37}
            size={95}
            avatar={avatar}
            withBadge={withBadge}
            badgeDetails={{ name: "plus", type: "entypo" }}
            withAvailable={withAvailable}
            available={available}
          />
        </Button>
        <Text style={styles.name}>{name}</Text>
        <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
          <Stack direction="row" justify="start">
            {business && (
              <>
                <Text style={styles.business}>
                  {displayDash(business?.name)}
                </Text>
                <IconStar sx={styles.star} />
              </>
            )}
            <Text style={styles.ratingsAverage}>
              {displayDash(ratingsAverage?.toFixed(1))}
            </Text>
          </Stack>
          {showDetails && (
            <Stack direction="row" sx={{ marginTop: 10 }}>
              <Button onPress={() => navigation.navigate("About")}>
                <Stack direction="row">
                  <Icon name="keyboard-arrow-down" size={15} color="white" />
                  <Icon name="clock" type="feather" color={grey0} size={17.5} />
                  <Text style={styles.text}>{displayDash(status)}</Text>
                </Stack>
              </Button>
              <Button
                onPress={() =>
                  navigation.navigate("Map", { location, business })
                }
              >
                <Stack direction="row" sx={{ marginLeft: 10 }}>
                  <IconLocation color={grey0} size={17.5} />
                  <Text style={styles.text}>
                    {t("at")} {displayDash(distance?.toFixed(0))} km
                  </Text>
                  <Icon name="keyboard-arrow-down" size={15} color={black} />
                </Stack>
              </Button>
            </Stack>
          )}
        </Protected>
      </Stack>
      <Stack justify="center" align="center" sx={styles.servicesContainer}>
        <ScrollView
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {services?.map((service, i) => (
            <Button key={i} onPress={() => handleGoToProducts(service?._id)}>
              <Text style={styles.service}>{service?.name}</Text>
            </Button>
          ))}
        </ScrollView>
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
          <StatsButton
            onPress={() =>
              navigation.navigate("ProfileStats", {
                screen: "Reviews",
                userId: _id,
                username: username,
                initialRoute: "Reviews",
                role,
              })
            }
            labelStats={t("reviews")}
            statsNo={displayDash(ratingsQuantity)}
          />
        </Protected>
        <Protected userRole={role} roles={[THIRD_ROLE]}>
          <StatsButton
            labelStats={t("posts")}
            statsNo={displayDash(postsCount)}
          />
        </Protected>
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileStats", {
              screen: "Followers",
              userId: _id,
              username: username,
              initialRoute: "Followers",
              role,
            })
          }
          labelStats={t("followers")}
          statsNo={displayDash(followersCount)}
        />
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileStats", {
              screen: "Following",
              userId: _id,
              username: username,
              initialRoute: "Following",
              role,
            })
          }
          labelStats={t("following")}
          statsNo={displayDash(followingCount)}
        />
      </Stack>
      <Stack direction="row" justify="center" sx={styles.buttonsContainer}>
        {children}
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  name: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  business: {
    fontFamily: "Exo-Bold",
    color: primary,
    marginLeft: 5,
    fontSize: 14.5,
    textTransform: "capitalize",
  },
  ratingsAverage: { fontFamily: "Exo-SemiBold", marginLeft: 2.5 },
  servicesContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 12,
    color: black,
  },
  statsContainer: {
    width: "100%",
    paddingHorizontal: 60,
    marginBottom: 2.5,
  },
  buttonsContainer: {
    marginVertical: 10,
  },
  star: { marginLeft: 7.5 },
  text: {
    fontFamily: "Exo-SemiBold",
    fontSize: 13.5,
    marginLeft: 5,
    color: black,
  },
});
