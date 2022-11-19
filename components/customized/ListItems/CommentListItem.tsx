import { useState } from "react";
import { DisplayComment } from "./DisplayComment";
import { useHttpGetFunc } from "../../../hooks";
import { RelatedComments } from "../../../models/relatedComments";

export const CommentListItem = ({ item, onReply, creatorId }) => {
  const [relatedComments, setRelatedComments] = useState<RelatedComments[]>([]);

  const { makeGet: handleRelated, loading } = useHttpGetFunc(
    `/comments/${item?._id}/related-comments?page=0&limit=20`,
    (data) => setRelatedComments(data)
  );

  return (
    <DisplayComment
      item={item}
      creatorId={creatorId}
      onReply={onReply}
      onHandleRelated={handleRelated}
      relatedComments={relatedComments}
      loadingRelated={loading}
    />
  );
};
