import { StyleSheet, Text, FlatList, ListRenderItemInfo } from "react-native";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";
import RecommendedUserListItem from "../ListItems/RecommendedUserListItem";

const { black } = theme.lightColors || {};

type IProps = { suggested: any; userId: string | undefined };

const SuggestedUsersList = ({ suggested, userId }: IProps) => {
  const { t } = useTranslation();

  const renderSuggested = useCallback(({ item }: ListRenderItemInfo<any>) => {
    return <RecommendedUserListItem item={item} onRemoveCard={() => {}} />;
  }, []);

  const keyExtractor = useCallback((item: any) => item?.id, []);

  return (
    <Stack align="start" justify="start">
      <Text style={styles.title}>{t("suggestionForYou")}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={suggested}
        keyExtractor={keyExtractor}
        renderItem={renderSuggested}
        contentContainerStyle={{ paddingHorizontal: 7.5 }}
      />
    </Stack>
  );
};

export default memo(SuggestedUsersList);

const styles = StyleSheet.create({
  title: {
    fontWeight: "500",
    color: black,
    marginBottom: 15,
    fontSize: 15,
    marginLeft: 15,
  },
});
