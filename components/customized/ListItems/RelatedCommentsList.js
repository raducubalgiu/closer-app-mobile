import { FlatList, View } from "react-native";
import React, { useCallback } from "react";
import { DisplayComment } from "./DisplayComment";

export const RelatedCommentsList = ({ relatedComments, onReply }) => {
  const keyExtractor = useCallback((item) => item?._id, []);

  const renderComment = useCallback(({ item }) => {
    return (
      <DisplayComment
        item={item}
        onReply={() =>
          onReply(item.user.username, item._id, item.previousComment)
        }
      />
    );
  }, []);

  return (
    <FlatList
      data={relatedComments}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      renderItem={renderComment}
      style={{ width: "100%", marginTop: 15 }}
    />
  );
};
