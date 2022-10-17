import { StyleSheet, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";
import { CardSuggestedPeople } from "../Cards/CardSuggestedPeople";

const { black } = theme.lightColors;

export const SuggestedUsersList = ({ suggested, userId }) => {
  const [people, setPeople] = useState(suggested);
  const { t } = useTranslation();

  const removeCard = useCallback(
    (userId) => {
      setPeople(people.filter((suggested) => suggested?._id !== userId));
    },
    [userId]
  );

  const renderSuggested = useCallback(({ item }) => {
    const { avatar, name, profession, counter, username, _id } = item;

    return (
      <CardSuggestedPeople
        avatar={avatar}
        title={name}
        profession={profession?.name}
        noFollowers={counter?.followersCount}
        ratingsAverage={counter?.ratingsAverage?.toFixed(1)}
        username={username}
        followeeId={_id}
        onRemoveCard={() => removeCard(item?._id)}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <Stack align="start" justify="start" sx={styles.container}>
      <Text style={styles.title}>{t("suggestionForYou")}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={people}
        keyExtractor={keyExtractor}
        renderItem={renderSuggested}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    fontWeight: "600",
    color: black,
    marginBottom: 10,
    fontSize: 15,
  },
});
