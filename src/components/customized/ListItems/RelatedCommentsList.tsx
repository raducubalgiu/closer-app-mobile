import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import DisplayComment from "./DisplayComment";

type IProps = {
  relatedComments: any;
  onReply: (a: any, b: any) => void;
  creatorId: string;
};

export const RelatedCommentsList = ({
  relatedComments,
  onReply,
  creatorId,
}: IProps) => {
  const keyExtractor = useCallback((item: any) => item?.id, []);

  const renderComment = useCallback(({ item }: ListRenderItemInfo<any>) => {
    return (
      <DisplayComment
        item={item}
        creatorId={creatorId}
        onReply={() => onReply(item.user.username, item.id)}
      />
    );
  }, []);

  return (
    <FlatList
      data={relatedComments}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      renderItem={renderComment}
      style={{ width: "100%", marginTop: 15, backgroundColor: "red" }}
    />
  );
};
