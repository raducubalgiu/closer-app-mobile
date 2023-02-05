import { Animated, StyleSheet, Text, Dimensions, View } from "react-native";
import { useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { ListItem, Protected, Spinner, Stack } from "../../../core";
import { useTranslation } from "react-i18next";
import { AddressFormat, trimFunc } from "../../../../utils";
import { useGet } from "../../../../hooks";
import MapStatic from "../../Map/MapStatic";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { MapPreviewModal } from "../../Modals/MapPreviewModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import dayjs from "dayjs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { black, grey0, primary } = theme.lightColors || {};
type IProps = {
  locationId: string;
  role: string;
  website: string;
  description: string;
  email: string;
  hours: any;
  onScroll: () => void;
  paddingBottom: number;
};
const { height } = Dimensions.get("window");

export const AboutProfileTab = ({
  locationId,
  role,
  website,
  description,
  email,
  hours,
  onScroll,
  paddingBottom,
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();

  const {
    data: location,
    isLoading,
    isFetching,
  } = useGet({
    model: "location",
    uri: `/locations/${locationId}`,
    enabled: isFocused && !!locationId,
    enableId: locationId,
  });

  const { ownerId } = location || {};
  const loading = (isLoading || isFetching) && locationId;
  const contactInfo = website || email;

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      userId: ownerId.id,
      avatar: ownerId.avatar,
      username: ownerId.username,
      name: ownerId.name,
      checkmark: ownerId.checkmark,
      service: null,
      option: null,
    });
  };

  const dateFormat = (minutes: number) => {
    if (minutes === -1) return t("closed");

    return dayjs().utc().startOf("day").add(minutes, "minutes").format("HH:mm");
  };

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <Animated.ScrollView
          onScroll={onScroll}
          contentContainerStyle={{ paddingBottom }}
        >
          <Stack align="start" sx={styles.section}>
            <Text style={styles.heading}>{t("biography")}</Text>
            <Text style={styles.text}>
              {description ? trimFunc(description, 115) : t("notAdded")}
            </Text>
          </Stack>
          <Stack align="start" sx={styles.section}>
            <Text style={styles.heading}>{t("contact")}</Text>
            {website && (
              <ListItem
                onPress={() =>
                  WebBrowser.openBrowserAsync(`https://${website}`)
                }
              >
                <Icon name="globe" type="feather" color={grey0} />
                <Text style={{ ...styles.text, marginTop: 0, marginLeft: 7.5 }}>
                  {website}
                </Text>
              </ListItem>
            )}
            {email && (
              <ListItem onPress={() => Linking.openURL(`mailto:${email}`)}>
                <Icon name="mail" type="feather" color={grey0} />
                <Text style={{ ...styles.text, marginTop: 0, marginLeft: 7.5 }}>
                  {email}
                </Text>
              </ListItem>
            )}
            <Protected userRole={role} roles={[SECOND_ROLE]}>
              <ListItem onPress={goToUser}>
                <Icon name="repeat" type="feather" color={grey0} />
                <Stack direction="row">
                  <Text
                    style={{ ...styles.text, marginTop: 0, marginLeft: 7.5 }}
                  >
                    Angajat la
                  </Text>
                  <Text style={styles.owner}>{ownerId?.name}</Text>
                </Stack>
              </ListItem>
            </Protected>
            {!contactInfo && <Text style={styles.text}>{t("notAdded")}</Text>}
          </Stack>
          <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            <Stack align="start" sx={styles.section}>
              <Text style={styles.heading}>{t("location")}</Text>
              <ListItem>
                <Icon name="map-pin" type="feather" color={grey0} />
                <Text style={[styles.text, styles.address]}>
                  {AddressFormat(location?.address)}
                </Text>
              </ListItem>
            </Stack>
            <MapStatic
              height={200}
              latitude={location?.address?.coordinates[0]}
              longitude={location?.address?.coordinates[1]}
              minZoom={10}
              onOpenModal={() => setVisible(true)}
            />
            {hours && (
              <Stack align="start" sx={styles.section}>
                <Text style={styles.heading}>Program</Text>
                {Object.entries(hours)?.map((el: any, i) => {
                  return (
                    <ListItem between key={i}>
                      <Text style={styles.text}>{t(el[0])}</Text>
                      <Text style={styles.heading}>
                        {dateFormat(el[1].start)} - {dateFormat(el[1].end)}
                      </Text>
                    </ListItem>
                  );
                })}
              </Stack>
            )}
          </Protected>
        </Animated.ScrollView>
      )}
      {loading && <Spinner />}
      <MapPreviewModal
        visible={visible}
        onCloseModal={() => setVisible(false)}
        latitude={location?.address?.coordinates[0]}
        longitude={location?.address?.coordinates[1]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  section: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    color: black,
    fontWeight: "600",
  },
  text: {
    marginTop: 10,
    color: grey0,
  },
  address: { marginTop: 0, marginLeft: 7.5, flex: 1 },
  owner: {
    marginLeft: 5,
    fontWeight: "600",
    color: primary,
    fontSize: 14.5,
  },
});
