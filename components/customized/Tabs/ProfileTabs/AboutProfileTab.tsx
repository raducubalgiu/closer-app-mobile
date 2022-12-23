import { ScrollView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { ListItem, Protected, Spinner, Stack } from "../../../core";
import { useTranslation } from "react-i18next";
import { AddressFormat, trimFunc } from "../../../../utils";
import { useGet } from "../../../../hooks";
import { MapStatic } from "../../Map/MapStatic";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { MapPreviewModal } from "../../Modals/MapPreviewModal";

const { black, grey0 } = theme.lightColors || {};
type IProps = {
  locationId: string;
  role: string;
  website: string;
  description: string;
  email: string;
  hours: any;
};

export const AboutProfileTab = ({
  locationId,
  role,
  website,
  description,
  email,
  hours,
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const isFocused = useIsFocused();

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

  const loading = isLoading || isFetching;
  const contactInfo = website || email;

  return (
    <>
      {!loading && (
        <ScrollView style={styles.screen}>
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
                <Text style={{ ...styles.text, marginTop: 0, marginLeft: 5 }}>
                  {website}
                </Text>
              </ListItem>
            )}
            {email && (
              <ListItem onPress={() => Linking.openURL(`mailto:${email}`)}>
                <Icon name="mail" type="feather" color={grey0} />
                <Text style={{ ...styles.text, marginTop: 0, marginLeft: 5 }}>
                  {email}
                </Text>
              </ListItem>
            )}
            <Protected userRole={role} roles={[SECOND_ROLE]}>
              <ListItem onPress={() => Linking.openURL(`mailto:${email}`)}>
                <Icon name="repeat" type="feather" color={grey0} />
                <Text style={{ ...styles.text, marginTop: 0, marginLeft: 5 }}>
                  Angajat la @trattoria_monza
                </Text>
              </ListItem>
            </Protected>
            {!contactInfo && <Text style={styles.text}>{t("notAdded")}</Text>}
          </Stack>
          <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            <Stack align="start" sx={styles.section}>
              <Text style={styles.heading}>{t("location")}</Text>
              <ListItem>
                <Icon name="map-pin" type="feather" color={grey0} />
                <Text style={{ ...styles.text, ...styles.address }}>
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
                        {el[1].start} - {el[1].end}
                      </Text>
                    </ListItem>
                  );
                })}
              </Stack>
            )}
          </Protected>
        </ScrollView>
      )}
      {loading && <Spinner />}
      <MapPreviewModal
        visible={visible}
        onCloseModal={() => setVisible(false)}
        latitude={location?.address?.coordinates[0]}
        longitude={location?.address?.coordinates[1]}
      />
    </>
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
  address: { marginTop: 0, marginLeft: 5, flex: 1 },
});
