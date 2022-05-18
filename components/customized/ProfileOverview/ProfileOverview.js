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
} from "../../core";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";

export const ProfileOverview = (props) => {
  const { user: userContext } = useAuth();
  const { user, withBadge } = props;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleGoToProducts = (serviceId) => {
    if (user?._id === userContext?._id) {
      navigation.navigate("MyProducts", { serviceId });
    }
  };

  return (
    <View style={styles.container}>
      <Stack justify="center" align="center">
        <Button>
          <CustomAvatar
            iconSize={37}
            size={95}
            avatar={user?.avatar}
            withBadge={withBadge}
            badgeDetails={{ name: "plus", type: "entypo" }}
          />
        </Button>
        <Text style={styles.name}>@{user?.username}</Text>
        <Stack direction="row" justify="start">
          <Protected userRole={user?.role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            {user?.business && (
              <>
                <Text style={styles.business}>{user?.business?.name}</Text>
                <IconStar sx={styles.star} />
              </>
            )}
            <Text style={styles.ratingsAverage}>
              {user?.counter?.ratingsAverage?.toFixed(1)}
            </Text>
          </Protected>
        </Stack>
      </Stack>
      <Stack justify="center" align="center" sx={styles.servicesContainer}>
        <ScrollView
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {user?.services?.map((service, i) => (
            <Button key={i} onPress={() => handleGoToProducts(service?._id)}>
              <Text style={styles.service}>{service?.name}</Text>
            </Button>
          ))}
        </ScrollView>
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <Protected userRole={user?.role} roles={[MAIN_ROLE, SECOND_ROLE]}>
          <StatsButton
            onPress={() =>
              navigation.navigate("ProfileGeneralStack", {
                screen: "ProfileStats",
                params: {
                  userId: user?._id,
                  username: user?.username,
                  initialRoute: "Ratings",
                },
              })
            }
            labelStats={t("reviews")}
            statsNo={user?.counter?.ratingsQuantity}
          />
        </Protected>
        <Protected userRole={user?.role} roles={[THIRD_ROLE]}>
          <StatsButton
            labelStats={t("posts")}
            statsNo={user?.counter?.ratingsQuantity}
          />
        </Protected>
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileGeneralStack", {
              screen: "ProfileStats",
              params: {
                userId: user?._id,
                username: user?.username,
                initialRoute: "Followers",
              },
            })
          }
          labelStats={t("followers")}
          statsNo={user?.counter?.followersCount}
        />
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileGeneralStack", {
              screen: "ProfileStats",
              params: {
                userId: user?._id,
                username: user?.username,
                initialRoute: "Following",
              },
            })
          }
          labelStats={t("following")}
          statsNo={user?.counter?.followingCount}
        />
      </Stack>
      <Stack direction="row" justify="center" sx={styles.buttonsContainer}>
        {props?.actionButtons}
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
    color: theme.lightColors.black,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  business: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    marginLeft: 5,
    fontSize: 14,
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
    color: theme.lightColors.black,
  },
  statsContainer: {
    width: "100%",
    paddingHorizontal: 60,
    marginBottom: 10,
  },
  buttonsContainer: {
    marginVertical: 10,
  },
  star: { marginLeft: 7.5 },
});
