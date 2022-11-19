import { FlatList } from "react-native";
import { useCallback } from "react";
import { DisplayComment } from "./DisplayComment";

export const RelatedCommentsList = ({
  relatedComments,
  onReply,
  creatorId,
}) => {
  const keyExtractor = useCallback((item) => item?._id, []);

  const renderComment = useCallback(({ item }) => {
    return (
      <DisplayComment
        item={item}
        creatorId={creatorId}
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
