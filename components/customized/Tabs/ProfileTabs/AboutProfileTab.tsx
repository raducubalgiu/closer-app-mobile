import { ScrollView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import theme from "../../../../assets/styles/theme";
import { useIsFocused } from "@react-navigation/native";
import {
  ListItem,
  Protected,
  Spinner,
  Stack,
  IconButton,
  CModal,
} from "../../../core";
import { useTranslation } from "react-i18next";
import { AddressFormat, trimFunc } from "../../../../utils";
import { useGet } from "../../../../hooks";
import { MapStatic } from "../../Map/MapStatic";
import { Icon } from "@rneui/themed";
import { MAIN_ROLE, SECOND_ROLE } from "@env";

const { black, primary, grey0 } = theme.lightColors || {};
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

  return (
    <>
      {!loading && (
        <ScrollView style={styles.screen}>
          <Stack align="start" sx={styles.section}>
            <Text style={styles.heading}>{t("biography")}</Text>
            <Text style={styles.bio}>
              {description ? trimFunc(description, 115) : t("notAdded")}
            </Text>
          </Stack>
          <Stack align="start" sx={styles.section}>
            <Text style={styles.heading}>{t("contact")}</Text>
            <ListItem>
              <Icon name="globe" type="feather" color={grey0} />
              <Text style={{ ...styles.bio, marginTop: 0, marginLeft: 5 }}>
                {website}
              </Text>
            </ListItem>
            <ListItem>
              <Icon name="mail" type="feather" color={grey0} />
              <Text style={{ ...styles.bio, marginTop: 0, marginLeft: 5 }}>
                {email}
              </Text>
            </ListItem>
          </Stack>
          <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            <Stack align="start" sx={styles.section}>
              <Text style={styles.heading}>{t("location")}</Text>
              <ListItem>
                <Icon name="map-pin" type="feather" color={grey0} />
                <Text
                  style={{
                    ...styles.bio,
                    marginTop: 0,
                    marginLeft: 5,
                    flex: 1,
                  }}
                >
                  {AddressFormat(location?.address)}
                </Text>
              </ListItem>
            </Stack>
            <Stack>
              <MapStatic
                height={200}
                longitude={26.100195}
                latitude={44.428286}
                minZoom={10}
              />
              <IconButton
                name="maximize-2"
                size={20}
                onPress={() => setVisible(true)}
                sx={{ ...styles.button, bottom: 15 }}
              />
            </Stack>
            <Stack align="start" sx={styles.section}>
              <Text style={styles.heading}>Program</Text>
              {hours &&
                Object.entries(hours)?.map((el: any, i) => {
                  return (
                    <ListItem between key={i}>
                      <Text style={styles.bio}>{t(el[0])}</Text>
                      <Text style={styles.heading}>
                        {el[1].start} - {el[1].end}
                      </Text>
                    </ListItem>
                  );
                })}
            </Stack>
          </Protected>
        </ScrollView>
      )}
      {loading && <Spinner />}
      <CModal
        visible={visible}
        size="xl"
        onCloseModal={() => setVisible(false)}
        header={false}
      >
        <MapStatic
          height={"100%"}
          longitude={26.100195}
          latitude={44.428286}
          zoomEnabled={true}
          scrollEnabled={true}
          sx={{ borderRadius: 5 }}
        />
        <IconButton
          name="close"
          type="material"
          onPress={() => setVisible(false)}
          size={20}
          sx={{ top: 15, ...styles.button }}
        />
      </CModal>
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
  seeMoreBtn: {
    color: primary,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    marginTop: 10,
    color: grey0,
  },
  label: {
    color: black,
    marginLeft: 10,
  },
  actionBtn: {
    color: black,
    fontSize: 14.5,
  },
  location: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13.5,
    color: black,
    paddingRight: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    fontSize: 13.5,
    color: primary,
  },
  stack: { marginTop: 10 },
  schedule: { marginTop: 10 },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    position: "absolute",
    right: 15,
  },
});
